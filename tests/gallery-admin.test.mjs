import assert from "node:assert/strict";
import test from "node:test";
import { clearLoginFailures, createAdminSession, hashAdminPassword, isSameOrigin, loginLimited, readLimitedBody, recordLoginFailure, requestOrigin, sessionCookie, verifyAdminPassword, verifyAdminSession, SESSION_SECONDS } from "../src/lib/congresso/admin-auth.ts";

const password = "example-password-for-tests-only";
const hash = hashAdminPassword(password);
const secret = "test-only-session-secret-12345678901234567890";
const now = 1794330000000;

test("password verification rejects wrong, empty, oversized and malformed credentials", () => {
  assert.equal(verifyAdminPassword(password, hash), true);
  for (const value of ["wrong", "", "a".repeat(257)]) assert.equal(verifyAdminPassword(value, hash), false);
  assert.equal(verifyAdminPassword(password, "invalid"), false);
  assert.notEqual(hashAdminPassword(password), hash);
});

test("sessions reject tampering, expiration, changed credentials and missing secrets", () => {
  const token = createAdminSession(secret, hash, now);
  assert.equal(verifyAdminSession(token, secret, hash, now), true);
  assert.equal(verifyAdminSession(token, secret, hash, now + SESSION_SECONDS * 1000), false);
  assert.equal(verifyAdminSession(token, secret, hashAdminPassword("replacement"), now), false);
  assert.equal(verifyAdminSession(token, "", hash, now), false);
  for (const invalid of [token.replace(/^./, "9"), `${token}x`, "", "../../secret", "9".repeat(300)]) assert.equal(verifyAdminSession(invalid, secret, hash, now), false);
});

test("session cookies are HttpOnly, restricted to the same site, and secure over HTTPS", () => {
  const cookie = sessionCookie("test-token", true);
  for (const value of ["HttpOnly", "SameSite=Strict", "Secure", "Path=/"]) assert.ok(cookie.includes(value));
  assert.ok(sessionCookie("", true, 0).includes("Max-Age=0"));
  assert.ok(!sessionCookie("token", false).includes("; Secure"));
});

test("mutations reject absent, cross-origin and lookalike origins", () => {
  const url = "https://congressopaieterno.com.br/api/admin/galeria/fotos";
  assert.equal(isSameOrigin(new Request(url, { headers: { origin: "https://congressopaieterno.com.br" } })), true);
  for (const origin of ["https://example.com", "https://congressopaieterno.com.br.example.com", "null", "http://congressopaieterno.com.br"]) assert.equal(isSameOrigin(new Request(url, { headers: { origin } })), false);
  assert.equal(isSameOrigin(new Request(url)), false);
});

test("repeated login failures are limited and successful login resets the counter", () => {
  const key = "test-client";
  clearLoginFailures(key);
  for (let index = 0; index < 8; index++) recordLoginFailure(key);
  assert.equal(loginLimited(key), true);
  clearLoginFailures(key);
  assert.equal(loginLimited(key), false);
});

test("origin validation supports deployment proxies and rejects forged forwarded hosts", () => {
  const request = new Request("http://localhost:3101/upload", { headers: { host: "congressopaieterno.com.br", "x-forwarded-proto": "https", origin: "https://congressopaieterno.com.br" } });
  assert.equal(requestOrigin(request), "https://congressopaieterno.com.br");
  assert.equal(isSameOrigin(request), true);
  const forged = new Request("https://congressopaieterno.com.br/upload", { headers: { host: "congressopaieterno.com.br", "x-forwarded-host": "example.com", origin: "https://example.com" } });
  assert.equal(isSameOrigin(forged), false);
  assert.equal(isSameOrigin(new Request("http://localhost:3101/upload", { headers: { host: "127.0.0.1:3101", origin: "http://127.0.0.1:3101" } })), true);
});

test("body limits apply to both declared sizes and streamed bytes", async () => {
  const url = "https://example.com/upload";
  assert.equal((await readLimitedBody(new Request(url, { method: "POST", body: "123" }), 3)).byteLength, 3);
  await assert.rejects(readLimitedBody(new Request(url, { method: "POST", body: "1234" }), 3), /BODY_TOO_LARGE/);
  await assert.rejects(readLimitedBody(new Request(url, { method: "POST", headers: { "content-length": "999" }, body: "1" }), 3), /BODY_TOO_LARGE/);
});
