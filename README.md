# Why DataLinks?

- Natural language interface for your data
- Flexible, fast setup
- Ideal for internal tools, rapid prototyping, and curious minds
- Deploy natural langage searches in 10 minutes

## Quickstart

1. Duplicate .env.example as .env.local
2. Fill it with your configuration (detailed below)
3. Run the project - and behold the power of natural language search in your hands

## Setup

Provide all required environment variables in a `.env.local` file.
Use `.env.example` as a reference.

## Environment Variables Instructions

### DATALINKS_DATASET

Open the dataset you want to use in DataLinks, copy its displayed name, and paste it into `.env.local`.

For example, for the dataset shown below:

_datalinks/supplychain/tariffs_

Your `.env.local` entry should look like this:

![DataLinks Dataset Visualization](/public/Datalinks_Dataset.png)

Your `.env.local` entry should look like this:

`DATALINKS_DATASET=datalinks/supplychain/tariffs`

### DATALINKS_TOKEN

Visit `https://datalinks.com/dashboard/settings` and create a new token.
Paste the token into your `.env.local`.

### USE_NATURAL_LANGUAGE_QUERY

This flag enables or disables the natural language query adjustment feature in the web app.

## Need Help or Inspiration?

We're here if you need a hand - from setup to deployment.
Visit [datalinks.com](https://datalinks.com/) or drop us a message anytime.

For tips, tricks, and updates, follow us on [LinkedIn](https://www.linkedin.com/company/datasetlinks/).
Let's shape the future of data interaction together.
