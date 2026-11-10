import assert from "node:assert/strict";
import test from "node:test";
import { isAllowedPhoto, isAuthorizedPhoto, isDriveId, isPlaylistId, isVideoId, MAX_PHOTO_BYTES, pageItems, photoTitle, readPage } from "../src/lib/congresso/policy.ts";

const root = "root_folder_12345";
const photo = { id: "allowed_photo_123", name: "Foto.jpg", mimeType: "image/jpeg", size: "1200", parents: [root] };
const folder = { id: "day_folder_12345", name: "Dia 1", mimeType: "application/vnd.google-apps.folder", parents: [root] };

test("only supported, bounded, non-trashed images enter the gallery", () => {
  assert.equal(isAllowedPhoto(photo), true);
  for (const invalid of [{ mimeType: "application/pdf" }, { mimeType: "image/svg+xml" }, { size: String(MAX_PHOTO_BYTES + 1) }, { size: "NaN" }, { size: "0" }, { size: undefined }, { trashed: true }, { id: "../../secret" }]) {
    assert.equal(isAllowedPhoto({ ...photo, ...invalid }), false);
  }
});

test("proxy accepts the root and its immediate day folders", async () => {
  assert.equal(await isAuthorizedPhoto(photo, root, async () => { throw new Error("Root image needs no folder query"); }), true);
  assert.equal(await isAuthorizedPhoto({ ...photo, parents: [folder.id] }, root, async () => folder), true);
});

test("proxy rejects files outside the root even if the service account can read them", async () => {
  assert.equal(await isAuthorizedPhoto({ ...photo, parents: [folder.id] }, root, async () => ({ ...folder, parents: ["private_folder_123"] })), false);
  assert.equal(await isAuthorizedPhoto({ ...photo, parents: [folder.id] }, root, async () => ({ ...folder, trashed: true })), false);
  assert.equal(await isAuthorizedPhoto({ ...photo, parents: [] }, root, async () => folder), false);
  assert.equal(await isAuthorizedPhoto({ ...photo, trashed: true }, root, async () => folder), false);
});

test("invalid identifiers and pages cannot alter upstream URLs or queries", () => {
  assert.equal(isDriveId("abc' or trashed=false"), false);
  assert.equal(isPlaylistId("PL_VALID_PLAYLIST_123"), true);
  assert.equal(isPlaylistId("https://youtube.com/playlist?list=abc"), false);
  assert.equal(isVideoId("abcdefghijk"), true);
  assert.equal(isVideoId("../../video"), false);
  assert.equal(readPage(null), 1);
  assert.equal(readPage("2"), 2);
  for (const value of ["0", "-1", "1.5", "NaN", "1e3", "99999", ""]) assert.throws(() => readPage(value));
});

test("pagination exposes each item once and stops after the final page", () => {
  const items = Array.from({ length: 25 }, (_, index) => index);
  const pages = [1, 2, 3].map((page) => pageItems(items, page, 12));
  assert.deepEqual(pages.flatMap((page) => page.items), items);
  assert.deepEqual(pages.map((page) => page.nextPage), [2, 3, undefined]);
  assert.deepEqual(pageItems(items, 4, 12).items, []);
});

test("photo captions retain supplied names without file extensions", () => {
  assert.equal(photoTitle("Missa_de_abertura.JPG"), "Missa de abertura");
  assert.equal(photoTitle(".jpg"), "Foto do Congresso");
});
