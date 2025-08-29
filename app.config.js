import 'dotenv/config';

export default {
    expo: {
        name: "my-app",
        slug: "my-app",
        extra: {
        kakaoMapKey: process.env.KAKAO_MAP_KEY,
        apiBaseUrl: process.env.API_BASE_URL
        },
    },
};