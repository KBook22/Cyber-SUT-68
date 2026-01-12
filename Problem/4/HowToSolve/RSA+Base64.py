from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_v1_5
import base64

# 1. ข้อมูลที่ต้องการให้เป็นผลลัพธ์หลัง Decrypt (ตามที่คุณระบุ)
# หมายเหตุ: เราเข้ารหัสตัว Text ที่เป็น Base64 เลย ไม่ใช่ตัว Flag จริง
target_payload = b"VU5BTUV7RHlOYU1pVEUwMDd9"

# 2. Public Key ที่คุณให้มา
public_key_pem = """-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDYcsUSuvnrgvGzw8UXfrZbqEAv
j1amsEK8S8ey2SouwDE+gi+blUC5+e8uiMiarpiJmaSbhEtzUttC9xC6T9QK3zIN
HK5xdikReKrEeXZhtKIXINlHtj3YI5qY/pOSg+bDmlIN4bYADe/AgiiYmxBf2aNI
CqzpvRPDulNjFB49bwIDAQAB
-----END PUBLIC KEY-----"""

# 3. โหลด Key และทำการเข้ารหัส (Encrypt)
# ใช้ PKCS1 v1.5 ซึ่งเป็นมาตรฐานทั่วไปสำหรับ RSA
key = RSA.import_key(public_key_pem)
cipher = PKCS1_v1_5.new(key)
ciphertext = cipher.encrypt(target_payload)

# 4. บันทึกเป็นไฟล์ cipher.bin
with open("cipher.bin", "wb") as f:
    f.write(ciphertext)

print(f"สร้างไฟล์ cipher.bin สำเร็จ!")
print(f"ขนาดไฟล์: {len(ciphertext)} bytes")

#pip install pycryptodome ก่อนรัน
#https://gchq.github.io/CyberChef/ RSA ดีจัง