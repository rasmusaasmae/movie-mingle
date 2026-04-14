# Claude Code Guidelines

## Commits & Pushes
- Never bypass hooks or checks (`--no-verify`, `--force`, etc.)
- Fix all linting, formatting, and build errors before committing
- Sort imports to satisfy oxlint `sort-imports` rules

## Dependencies
- Always use fixed (exact) versions when adding packages — no `^` or `~` ranges
