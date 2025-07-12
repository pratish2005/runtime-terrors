# SkillSwap 
![Logo](https://skillswapbucket.s3.ap-south-1.amazonaws.com/assets/skillswap_logo_icon.png)

SkillSwap is an innovative platform designed for reciprocal learning and mentoring, addressing the need for affordable professional growth opportunities. It facilitates a barter system where users can both teach and learn, leveraging their skills for mutual benefit. The platform features user authentication, profile management, AI-driven matching, communication tools, and session scheduling to enhance user engagement and learning outcomes. SkillSwap aims to revolutionize the way individuals seek and offer professional mentoring, making it accessible, efficient, and tailored to personal growth goals.

## Table of Contents
- [Demo](#demo)
- [Installation](#installation)
- [Technology Stack](#technology-stack)
- [Authors](#authors)
- [License](#license)

## Demo
**Demo Link**: https://skillswap.anandbhagat.com/

**Test Credentials**:
- User 1:
    - **Email**: anbhagat1997@gmail.com
    - **Password**: 12345678    
- User 2:
    - **Email**: anbhagat2805@gmail.com
    - **Password**: 12345678

## Installation

Before running the project, ensure you have Node.js version `21.5.0` and npm version `10.2.4` or later installed. Then, follow these steps:

1. Clone the repository:
```bash
    git clone https://github.com/pesto-students/front-end-repo-p11-bit-busters-skill-swap.git
    cd front-end-repo-p11-bit-busters-skill-swap
```

2. Install dependencies:
```
    npm install
```

3. Configure environment variables:
Create a .env file in the root directory and populate it with the below keys:
```
    VITE_APP_API_URL=[Your API URL here]
    VITE_APP_SOCKET_URL=[Your Socket URL here]
    VITE_APP_SENTRY_DSN=[Your Sentry DSN here]
    VITE_APP_URL=[Your App URL here]
```

4. Start the project:
```
    npm run dev
```
Access the project through http://localhost:5173.


## Technology Stack
- React
- Redux
- Tailwind CSS
- Socket.io-client


## Authors
- [Anand Bhagat](https://anandbhagat.com/)

## License

This project is licensed under the MIT License - see [MIT License](https://opensource.org/licenses/MIT) for details.