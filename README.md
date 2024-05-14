<div align="center">
  <h1>RsNano.com</h1>
  
  <p>
    <a href="https://github.com/rsnano-node/rsnano.com" target="_blank">
      <img alt="Stars" src="https://img.shields.io/github/stars/rsnano-node/rsnano.com">
    </a>
  </p>
  <strong>
  The homepage for the <a href="https://github.com/rsnano-node/rsnano-node">RsNano</a> project</strong>
  
  <strong>A Rust port of <a href="https://nano.org">Nano</a> the feeless and digital currency
  </strong>
  
  <sub>🧡 Built with SvelteKit 🧡</sub>
</div>

## About

RsNano is a Rust port of the original [Nano Node](https://github.com/nanocurrency/nano-node). The original Nano Node is written in C++. While C++ is a very powerful language, it makes it easy to introduce potentially exploitable bugs, like buffer overflows, dangling pointers, race conditions or integer overflows.

Rust, on the other hand, offers similar performance characteristics as C++, but guarantees memory safety and thread safety at compile time.

> This Repository is the homepage for RsNano and available at [https://www.rsnano.com](https://www.rsnano.com). If you want to support the development of the RsNano node, head over to [https://github.com/rsnano-node/rsnano-node](https://github.com/rsnano-node/rsnano-node).

## Setup

1. Install [pnpm](https://pnpm.io/installation)

2. Clone the repo

```bash
git clone https://github.com/rsnano-node/rsnano.com
cd rsnano.com
pnpm i
```

## 💻 Develop

### 🛠️ Start a development server

After installing the required dependencies, you can start the development server with the following command:

```bash
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

## 📝 License

Copyright © 2021 [luxbe](https://github.com/luxbe)<br />
This project is [MIT](https://github.com/rsnano-node/rsnano.com/blob/main/LICENSE) licensed
