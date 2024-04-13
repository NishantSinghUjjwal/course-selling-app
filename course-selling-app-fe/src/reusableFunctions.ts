export const getAccessToken = () => {
    const token = localStorage.getItem("token")
    return token ? `Bearer ${token}` : ""
}