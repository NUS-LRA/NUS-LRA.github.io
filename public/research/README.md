# Research media

Drop your paper figures, GIFs, or videos for the **Research** section here.

## How to add a research highlight

1. Put your file in this folder, e.g. `public/research/my_paper.mp4`
   (or `.png`, `.jpg`, `.webp`, `.gif`).
2. Open `src/data.ts` and add / edit an entry in the `RESEARCH` array:

   ```ts
   {
     id: "my-paper",
     title: "My Paper Title",
     abstract: "A short summary of the work…",
     media: "research/my_paper.mp4",   // path relative to public/
     mediaType: "video",               // "image" | "video" | "gif"
     poster: "research/my_paper.jpg",  // optional still shown before a video loads
     tags: ["Tag A", "Tag B"],
     venue: "Highlighted Paper",       // optional label above the title
     link: "https://…",                // optional "Read more" link
     featured: true                     // optional — renders as the large top card
   }
   ```

## Notes

- `media` accepts either a path inside this `public/` folder (e.g.
  `research/cup_001.mp4`) **or** a full `https://…` URL.
- Videos autoplay muted and loop, so keep them short and lightweight
  (a few seconds, ideally under a few MB). Add a `poster` image for a nice
  first frame.
- Only one entry should have `featured: true`; the rest render in the grid.
