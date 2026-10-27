# Portfolio content — Kunal Wagh

## Profile

- **Name:** Kunal Wagh
- **Education:** MIT Mumbai college
- **Email:** [kunalwagh916@gmail.com](mailto:kunalwagh916@gmail.com)
- **GitHub:** [Kaiser879](https://github.com/Kaiser879)

### Short introduction

I’m Kunal, a student at MIT Mumbai who builds practical software across mobile, desktop, and Linux. My projects focus on making discovery and everyday tools more useful through thoughtful interfaces and clear technical decisions.

### Contact call to action

Have a project or idea in mind? [Get in touch](mailto:kunalwagh916@gmail.com).

## Selected projects

### Your Next Binge

- **Summary:** Find something you can actually stream, rent, or buy in India.
- **Description:** Your Next Binge is a React Native for Vega discovery app for Fire TV. It centers India-specific availability, combines live TMDB catalog data with semantic search, and lets people save titles to a watchlist that persists across restarts.
- **Highlights:**
  - Home discovery for trending titles and titles available through a user’s selected services.
  - Availability grouped into Stream, Rent, and Buy.
  - Semantic search compares query embeddings with an on-device index of 1,198 India-scoped titles.
  - Search falls back to keyword matching and local title matching when the embedding service or network is unavailable.
  - Watchlist and provider selections persist across app restarts.
- **Built with:** React Native for Vega, TypeScript, TMDB API, FastAPI, sentence-transformers, vector search.
- **Repository:** [Kaiser879/YourNextBinge](https://github.com/Kaiser879/YourNextBinge)
- **Demo:** [Devpost](https://devpost.com/software/your-next-binge)
- **Verification notes:** The README reports Debug and Release builds on the Vega Virtual Device, 76 Jest tests, and semantic search gate queries completing in 31–33 ms on that device. Physical Fire TV hardware was not tested. Trailer playback was removed because the tested virtual-device image lacked the required WebView module.

### mem

- **Summary:** Find files by what you remember, not what they’re named.
- **Description:** mem is a local-first document search tool. It indexes text from files such as PDFs and office documents, then searches that content with SQLite FTS5. Its terminal interface makes the interpreted query and constraints visible so people can understand and adjust their search.
- **Highlights:**
  - Scans files and extracts document text, with optional OCR through Tesseract for printed text.
  - Uses SQLite FTS5 and BM25 ranking, with extra weight for filename matches.
  - Parses hints such as file type and date before searching.
  - Reports when there are no matches instead of filling results with unrelated files.
  - Incremental scans skip files whose size and modification time have not changed.
- **Built with:** Go, SQLite FTS5, Bubble Tea, Tesseract OCR (optional).
- **Repository:** [Kaiser879/MeM](https://github.com/Kaiser879/MeM)
- **Reported sample:** An existing case study in the previous portfolio records a 4 ms second scan for a documented 46-file sample. Treat this as a project-specific sample result, not a general performance guarantee.
- **Scope notes:** OCR is optional and aimed at printed text; it does not identify image subjects or reliably read handwriting. Search is deterministic full-text retrieval and does not use an LLM.

### AirBlued

- **Summary:** Manage Linux Bluetooth devices from a terminal without shelling out to `bluetoothctl`.
- **Description:** AirBlued is an `nmtui`-style terminal interface built with Rust and ratatui. It communicates with the running `bluetoothd` service over system D-Bus through `bluer`. Background Bluetooth tasks report events to the application loop, keeping device work separate from terminal rendering.
- **Highlights:**
  - Enumerates the default adapter and known devices.
  - Streams discovered devices and sorts them by signal strength, with an F5 rescan action.
  - Supports connect/disconnect, trust/untrust, rename, and remove actions.
  - Confirms device removal and stops the radio scan when the scan screen closes.
  - Uses an event-driven application loop for UI input and asynchronous Bluetooth work.
- **Built with:** Rust, ratatui, bluer, crossterm, BlueZ, D-Bus.
- **Requirements:** Linux, BlueZ with `bluetoothd` running, Rust 1.88 or newer, and system D-Bus access.
- **Repository:** [Kaiser879/AirBlued](https://github.com/Kaiser879/AirBlued)
- **Status:** The README marks the scaffold, live device reads, scanning, and core device actions as implemented. Pairing-agent prompts, adapter settings, filtering/toasts, and GATT browsing remain future work.

## Optional achievement

- **BuildX — MIT Kernel Tech Club:** Winner, with MeM.

No year or exact placement details beyond “Winner” are currently included.

## Content source notes

- **Your Next Binge:** Adapted from the local project README at `/home/kaiser/Projects/Amazon-devpost/your-next-binge/README.md` and the portfolio’s existing project details.
- **AirBlued:** Adapted from the local project README at `/home/kaiser/Projects/airblued/README.md`.
- **MeM:** No local MeM project directory or README was found. The public raw README URL returned 404. The summary and technical details above use the MeM entry in the existing portfolio at `/home/kaiser/Projects/Portfolio-kunal/src/content/caseStudies.ts` and project metadata at `/home/kaiser/Projects/Portfolio-kunal/src/content/projects.ts`; confirm these against the repository README when available.
- **Personal details:** Name, college, and email were supplied by Kunal. No degree, graduation year, job title, or additional contact links have been inferred.
