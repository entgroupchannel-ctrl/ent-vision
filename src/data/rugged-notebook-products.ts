export interface NotebookConfig {
  label: string;
  cpu: string;
  ram: string;
  price: string;
}

export interface RuggedNotebook {
  id: string;
  model: string;
  title: string;
  screenSize: string;
  cpu: string;
  memory: string;
  protection: string;
  os: "Windows" | "Linux";
  image: string;
  badges: string[];
  configs: NotebookConfig[];
  priceStart?: string;
}

export const ruggedNotebooks: RuggedNotebook[] = [
  {
    id: "em-x15m",
    model: "EM-X15M",
    title: '15.6" Rugged AI PC Intel Windows+AI',
    screenSize: '15.6"',
    cpu: "Intel AI Processor (Meteor Lake-H Ultra5/Ultra7)",
    memory: "8GB / 16GB / 32GB DDR5 / 256GB / 512GB / 1TB SSD",
    protection: "MIL-STD-810H, IP65",
    os: "Windows",
    image: "https://entgroup-rugged.com/assets/em-x15a-V7O0Cy_Y.png",
    badges: ["AI Enhanced", "Large Display"],
    configs: [
      { label: "Ultra 5/7+32+256", cpu: "Intel Meteor Lake-H Ultra5 125H / Ultra7 155H", ram: "32GB+256GB SSD", price: "฿83,900" },
      { label: "Ultra 5/7+64+512", cpu: "Intel Meteor Lake-H Ultra5 125H / Ultra7 155H", ram: "64GB+512GB SSD", price: "฿89,600" },
    ],
    priceStart: "฿83,900",
  },
  {
    id: "em-x15a",
    model: "EM-X15A",
    title: '15.6" Rugged Notebook Intel Core i5/i7',
    screenSize: '15.6"',
    cpu: "Intel Core i5 / i7",
    memory: "8GB / 16GB / 32GB / 256GB / 512GB / 1TB SSD",
    protection: "MIL-STD-810G, IP65",
    os: "Windows",
    image: "https://entgroup-rugged.com/assets/em-x15a-V7O0Cy_Y.png",
    badges: ["Powerful Performance", "Rugged Build"],
    configs: [
      { label: "Ultra 7+32+256", cpu: "Intel Meteor Lake-H Ultra 7 155H", ram: "32GB+256GB SSD", price: "฿83,900" },
      { label: "Ultra 7+64+512", cpu: "Intel Meteor Lake-H Ultra 7 155H", ram: "64GB+512GB SSD", price: "฿89,500" },
    ],
    priceStart: "฿83,900",
  },
  {
    id: "em-x14a",
    model: "EM-X14A",
    title: '14" Rugged Notebook Intel Core i5/i7',
    screenSize: '14"',
    cpu: "Intel Core i5 / i7 (12th Gen)",
    memory: "8GB / 16GB / 32GB / 256GB / 512GB / 1TB SSD",
    protection: "MIL-STD-810G, IP65",
    os: "Windows",
    image: "https://entgroup-rugged.com/assets/em-x14a-CeYNitLa.png",
    badges: ["Compact Size", "High Performance"],
    configs: [
      { label: "i5+16+256", cpu: "Intel Core i5-1235U", ram: "16GB+256GB SSD", price: "฿62,900" },
      { label: "i7+32+256", cpu: "Intel Core i7-1255U", ram: "32GB+256GB SSD", price: "฿75,900" },
    ],
    priceStart: "฿62,900",
  },
  {
    id: "em-x14m",
    model: "EM-X14M",
    title: '14" Rugged AI Tablet PC Windows 11',
    screenSize: '14"',
    cpu: "Intel Core Ultra 5 125H",
    memory: "16GB / 32GB DDR5 / 256GB / 512GB / 1TB SSD",
    protection: "MIL-STD-810H, IP65",
    os: "Windows",
    image: "https://entgroup-rugged.com/assets/em-x14m-DwyheEo6.png",
    badges: ["AI PC with NPU", "Tablet Mode"],
    configs: [
      { label: "Ultra 5+16+256", cpu: "Intel Meteor Lake-H Ultra5 125H", ram: "16GB+256GB SSD", price: "฿69,900" },
      { label: "Ultra 7+32+256", cpu: "Intel Meteor Lake-H Ultra7 155H", ram: "32GB+256GB SSD", price: "฿83,900" },
    ],
    priceStart: "฿69,900",
  },
  {
    id: "em-i22j",
    model: "EM-I22J",
    title: '12.2" Windows 11 Rugged 2-in-1 Notebook',
    screenSize: '12.2"',
    cpu: "Intel Processor",
    memory: "8GB / 16GB / 128GB / 256GB / 512GB SSD",
    protection: "MIL-STD-810G, IP65",
    os: "Windows",
    image: "https://entgroup-rugged.com/assets/em-i22j-BG1wttE6.png",
    badges: ["2-in-1 Design", "Detachable Keyboard"],
    configs: [],
    priceStart: undefined,
  },
  {
    id: "em-i22j-linux",
    model: "EM-I22J Linux",
    title: '12.2" Intel Linux Ubuntu 22.04.4 Notebook',
    screenSize: '12.2"',
    cpu: "Intel Celeron N5100",
    memory: "8GB / 128GB SSD",
    protection: "IP65, -20°C to 60°C",
    os: "Linux",
    image: "https://entgroup-rugged.com/assets/em-i22j-BG1wttE6.png",
    badges: ["Linux Ubuntu 22.04.4", "Open Source OS"],
    configs: [],
    priceStart: undefined,
  },
  {
    id: "w14u-a",
    model: "W14U-A",
    title: '14" Windows Rugged Laptop Intel i5/i7',
    screenSize: '14"',
    cpu: "Intel Core i5-1135G7 / i7-1165G7 (11th Gen)",
    memory: "16GB DDR4 / 256GB SSD",
    protection: "IP65, -20°C to 60°C",
    os: "Windows",
    image: "https://entgroup-rugged.com/assets/w14u-t-CnIhYdCX.jpg",
    badges: ["Intel 11th Gen i5/i7", "IP65 Protection"],
    configs: [
      { label: "i5 16+256GB", cpu: "Intel Core i5-1135G7", ram: "16GB DDR4+256GB SSD", price: "฿65,900" },
      { label: "i7 16+256GB", cpu: "Intel Core i7-1165G7", ram: "16GB DDR4+256GB SSD", price: "฿72,900" },
    ],
    priceStart: "฿65,900",
  },
  {
    id: "w15u-t",
    model: "W15U-T",
    title: '15.6" Windows Rugged Laptop Intel i5/i7',
    screenSize: '15.6"',
    cpu: "Intel Core i5-1135G7 / i7-1165G7 (11th Gen)",
    memory: "8GB / 16GB / 256GB / 512GB / 1TB SSD",
    protection: "IP65, -20°C to 60°C",
    os: "Windows",
    image: "https://entgroup-rugged.com/assets/w15u-t-kYBGsKO4.jpg",
    badges: ["Intel 11th Gen i5/i7", "IP65 Protection"],
    configs: [],
    priceStart: undefined,
  },
  {
    id: "w14u-s",
    model: "W14U-S",
    title: '14" Windows Rugged Laptop Multi-Gen Intel',
    screenSize: '14"',
    cpu: "Intel i5/i7 (6th, 8th, 11th Gen)",
    memory: "8GB / 16GB / 32GB / 256GB / 512GB / 1TB / 2TB / 8TB SSD",
    protection: "IP53, -35°C to +50°C",
    os: "Windows",
    image: "https://entgroup-rugged.com/assets/w14u-s-BaC3G990.jpg",
    badges: ["Multi-Gen Intel CPUs", "Optional CFG 1050 GPU"],
    configs: [],
    priceStart: undefined,
  },
  {
    id: "w33u",
    model: "W33U",
    title: '13.3" Rugged Laptop',
    screenSize: '13.3"',
    cpu: "Intel Core i5-1135G7 (11th Gen)",
    memory: "8GB / 16GB / 256GB / 512GB SSD",
    protection: "IP67",
    os: "Windows",
    image: "https://entgroup-rugged.com/assets/w33u-DjSixhuc.jpg",
    badges: ["Fingerprint Recognition", "TPM 2.0 Security"],
    configs: [],
    priceStart: undefined,
  },
];
