import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "netlify-deploy/**",
      "netlify-deploy/.next/**",
      "netlify-deploy/node_modules/**",
      "out/**",
      "dist/**"
    ]
  },
  ...nextVitals
];

export default eslintConfig;
