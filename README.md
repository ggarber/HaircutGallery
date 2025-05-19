# Haircut Styles Gallery

This application showcases popular male and female haircut styles with a toggle for navigation and detailed tag-based filtering.

## Features

- Toggle between male and female haircut styles
- Filter haircuts by tags (Classic/Modern, Short/Medium/Long)
- Click on tags to filter the haircuts
- Display real images of haircuts (when available)
- Responsive design that works on mobile, tablet, and desktop

## Image Generation

This project includes a script to generate AI images for the haircuts using OpenAI's DALL-E model.

### Prerequisites

- Node.js installed
- An OpenAI API key

### Generating Haircut Images

1. Create a `.env` file in the root directory with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

2. Run the image generation script:
   ```
   npx tsx generate-haircut-images.ts [options]
   ```

   Options:
   - `--all`: Generate images for all haircuts (default)
   - `--male`: Generate images for male haircuts only
   - `--female`: Generate images for female haircuts only
   - `--limit=n`: Limit to generating n images
   - `--id=n`: Generate image for a specific haircut ID

   Examples:
   ```
   npx tsx generate-haircut-images.ts --male --limit=5
   npx tsx generate-haircut-images.ts --id=3
   ```

3. Generated images will be saved to the `public/images/haircuts` directory, and they will automatically be displayed in the application.

## Development

1. Start the development server:
   ```
   npm run dev
   ```

2. Open your browser and navigate to the provided URL.