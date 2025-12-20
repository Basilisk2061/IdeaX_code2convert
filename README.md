# Pasale (पसले) - Smart Inventory & Retail Analytics

**Pasale** is a comprehensive ecosystem designed to modernize local Kirana stores (small retail shops) in Nepal. By streamlining inventory management through voice-driven transactions and providing powerful data insights, Pasale bridges the gap between traditional retail and modern market analytics.

---

## 🌟 Vision
Most local retailers still rely on manual bookkeeping, which is time-consuming and prone to errors. Pasale simplifies this by offering a **"Super Simple UI"** with **Nepali Voice Support**, allowing shop owners to manage their business effortlessly. Meanwhile, the collected data serves as a goldmine for FMCG companies and market analysts to understand consumer behavior.

---

## 🏗️ System Architecture

The Pasale ecosystem is built on a multi-tiered architecture that ensures seamless data flow from a local shop to advanced AI models.

![System Architecture](C:/Users/ACER/.gemini/antigravity/brain/df009488-3385-401f-9cf0-74742d14e693/uploaded_image_1766246269987.png)

### 1. Mobile Application (The Shopkeeper's Tool)
- **Kirana Shop Owner Interaction:** Designed for ease of use by non-tech-savvy users.
- **Inventory Management:** Track products, stock levels, and sales.
- **Voice-to-Transaction:** Integrated Nepali language processing to record sales/purchases via voice commands (e.g., "५ किलो दाल बेचियो").
- **Offline Capabilities:** Local transaction logging before syncing with the backend.

### 2. Backend & Data Layer
- **Backend API:** Handles authentication, transaction validation, and reward/incentive logic to keep shop owners engaged.
- **Central Database:** Stores data related to Shops, Products, Transactions, and Reward points.

### 3. Data Processing & AI Layer
- **Data Processing Layer:** Cleans raw transaction data, aggregates it, and performs feature engineering.
- **AI & Analysis Models:** Trained on cleaned data to generate market insights, seasonal trends, and demand forecasting.

### 4. Web Dashboard (Market Insights)
- **Visualized Insights:** Provides seasonal trends, data forecasting, and product-specific insights.
- **Target Users:** FMCG Companies, Startups, and Market Analysts who subscribe to high-quality retail data.

---

## 🚀 Key Features

- **🇳🇵 Nepali Voice Input:** Specifically optimized for local shopkeepers to minimize typing.
- **📊 Real-time Analytics:** Visual feedback for shop owners on their top-selling items and daily earnings.
- **🎁 Reward System:** Incentivizes regular usage by offering points for every transaction logged.
- **📈 Market Forecasting:** Powerful dashboard for enterprise users to predict market demands.

---

## 🛠️ Tech Stack

### **Frontend (Mobile App)**
- **Framework:** Flutter (Dart)
- **Key Dependencies:**
  - `speech_to_text`: For Nepali voice recognition.
  - `shared_preferences`: Local data persistence.
  - `cupertino_icons`: Modern UI elements.

### **Backend & AI (Inferred)**
- **API:** RESTful API
- **Processing:** Python / Data Science Stack (Pandas, Scikit-learn)
- **Database:** Relational Database (PostgreSQL/MySQL)

---

## 📂 Project Structure (Mobile App)

```text
lib/
├── screens/
│   ├── homepage.dart           # Primary overview for shop owners
│   ├── dashboard_page.dart     # Sales visualization and summaries
│   ├── logs_screen.dart        # Detailed transaction history
│   ├── login.dart              # Secure authentication
│   └── custom_bottom_navbar.dart # Navigation logic
├── shop.dart                   # Core logic for inventory and voice processing
└── main.dart                   # Application entry point
```

---

## ⚙️ Getting Started

### Prerequisites
- Flutter SDK (latest version)
- Android Studio or VS Code with Flutter extension
- An Android/iOS device for voice input testing

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Basilisk2061/IdeaX_code2convert.git
   ```
2. Navigate to the project directory:
   ```bash
   cd App/Frontend/pasale
   ```
3. Install dependencies:
   ```bash
   flutter pub get
   ```
4. Run the application:
   ```bash
   flutter run
   ```

---

## 👥 Target Users

1. **Kirana Shop Owners:** Small-scale retailers looking for easy digital management.
2. **FMCG Companies:** For real-time market penetration data.
3. **Market Analysts:** To study seasonal trends and consumer behavior in the retail sector.

---

*Built with ❤️ for the Local Retail Community.*
