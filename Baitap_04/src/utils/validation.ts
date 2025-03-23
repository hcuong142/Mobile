export const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email không được để trống";
    if (!emailRegex.test(email)) return "Email không hợp lệ";
    return null;
  };
  export const validatePassword = (password: string): string | null => {
    if (!password) return "Mật khẩu không được để trống";
    if (password.length < 6) return "Mật khẩu phải có ít nhất 6 ký tự";
    return null;
  };
  
  export const validateConfirmPassword = (password: string, confirmPassword: string): string | null => {
    if (!confirmPassword) return "Vui lòng xác nhận mật khẩu";
    if (password !== confirmPassword) return "Mật khẩu xác nhận không khớp";
    return null;
  };

  export const validatePhoneNumber = (phone: string): string | null => {
    const phoneRegex = /^(?:\+84|0)([1-9]\d{8})$/; 
    if (!phone) return "Số điện thoại không được để trống";
    if (!phoneRegex.test(phone)) return "Số điện thoại không hợp lệ";
    return null;
};