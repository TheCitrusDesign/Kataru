/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    /** Your public website url */
    //NEXT_PUBLIC_URL: 'https://kataru.vercel.app',
    NEXT_PUBLIC_URL: 'http://localhost:3000',

    /** Your Mailchimp subscribe newsletter */
    //MAILCHIMP_API_KEY="your-mailchimp-api-key"
    //MAILCHIMP_AUDIENCE_ID="your-mailchimp-audience-id"
    MAILCHIMP_API_KEY: 'c4cc3f4156aea511cd43a7de56bfc33e-us21',
    MAILCHIMP_AUDIENCE_ID: 'f748392b83',
  },
};

module.exports = nextConfig;
