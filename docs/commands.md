# **Swichy CLI Commands Reference**:

Swichy provides a simple command-line interface for managing repositories. Below is a detailed breakdown of available commands, their syntax, and usage.

## **Options**:

- `-h, --help` → Display help information for the CLI or a specific command.

## **Commands & Usage**:

### 1. **Initialize Storage**:

```bash
switchy init
```

- Initializes the data file where repository information is stored.
- **Arguments:** None

### 2. **Add a New Repository**:

```bash
switchy add <path>
```

- Adds a new repository to the storage.
- **Arguments:**
  - `<path>` → The absolute or relative path of the repository.

**Example:**

```bash
switchy add /home/user/projects/my-repo
```

### 3. **Display Last Opened Repository**:

```bash
switchy last
```

- Displays the most recently accessed repository.
- **Arguments:** None

### 4. **Clear All Repositories**:

```bash
switchy reset
```

- Removes all stored repositories from the system.
- **Arguments:** None

### 5. **List All Stored Repositories**:

```bash
switchy list
```

- Displays a list of all stored repositories.
- **Arguments:** None

### 6. **Redirect to a Repository**:

```bash
switchy redirect <repoName>
```

- Opens a specific repository by its name.
- **Arguments:**
  - `<repoName>` → The name of the repository to open.

**Example:**

```bash
switchy redirect my-repo
```

### 7. **Find Repository Information**:

```bash
switchy find <repoName>
```

- Searches for a repository by name and retrieves its details.
- **Arguments:**
  - `<repoName>` → The name of the repository to find.

**Example:**

```bash
switchy find my-repo
```

### 8. **Remove a Specific Repository**:

```bash
switchy remove <repoName>
```

- Deletes a repository from the storage.
- **Arguments:**
  - `<repoName>` → The name of the repository to remove.

**Example:**

```bash
switchy remove my-repo
```

### 9. **Update a Repository Path**:

```bash
switchy update <repoName> <path>
```

- Updates the stored path of an existing repository.
- **Arguments:**
  - `<repoName>` → The name of the repository.
  - `<path>` → The new path for the repository.

**Example:**

```bash
switchy update my-repo /home/user/new-location/my-repo
```

### 10. **Display Help for a Specific Command**:

```bash
switchy help [command]
```

- Shows help information for a specific command.
- **Arguments (Optional):**
  - `[command]` → The command you need help with.

**Example:**

```bash
switchy help add
```

---