# Address Book

### prerequisites

1. [Node 14](https://nodejs.org/en/download/)

### Running Locally

1. Clone Repo (SSH)
```
git clone git@github.com:kevinhartmann23/visa-address-book.git
```

2. Install Dependencies for Server & UI From Root
```
npm install_deps
```

3. Start Server & UI from Root

```
npm run dev
```

4. _Optional_
If you prefer to not run server and client concurrently, follow these sub steps.
    1. Start Server

    ```
    cd server
    npm run start:nodemon
    ```

    2. Start Client

        ```
    cd ../client
    npm start
    ```

