from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_v1_5
import base64
import os

# กำหนด Path ของไฟล์โจทย์ (อ้างอิงจากรูปภาพของคุณ)
# ../ หมายถึงถอยกลับไป 1 โฟลเดอร์ แล้วเข้า ProblemGive
key_path = '../ProblemGive/private.pem'
cipher_path = '../ProblemGive/cipher.bin'

# ตรวจสอบว่าไฟล์มีอยู่จริงไหม (เผื่อกรณีรันคนละที่)
if not os.path.exists(key_path):
    # ถ้าหาไม่เจอ ให้ลองหาในโฟลเดอร์เดียวกันแทน
    key_path = 'private.pem'
    cipher_path = 'cipher.bin'

try:
    print(f"Reading private key from: {key_path}")
    # 1. โหลด Private Key
    with open(key_path, 'rb') as f:
        private_key = RSA.import_key(f.read())

    print(f"Reading cipher file from: {cipher_path}")
    # 2. อ่านไฟล์ Ciphertext (cipher.bin)
    with open(cipher_path, 'rb') as f:
        ciphertext = f.read()

    # 3. ถอดรหัส RSA (Decrypt)
    # ใช้ Sentinel เป็นค่าสุ่มหรือ None เพื่อป้องกัน Error กรณี Key ไม่ถูกต้อง
    sentinel = None 
    cipher = PKCS1_v1_5.new(private_key)
    decrypted_data = cipher.decrypt(ciphertext, sentinel)

    if decrypted_data:
        # ผลลัพธ์ที่ได้จะเป็น Byte String ของ Base64
        print(f"\n[+] RSA Decrypted (Base64): {decrypted_data.decode('utf-8')}")

        # 4. ถอดรหัส Base64 เพื่อเอา Flag จริง
        flag = base64.b64decode(decrypted_data).decode('utf-8')
        print(f"[+] Final FLAG: {flag}")
    else:
        print("[-] Decryption failed.")

except FileNotFoundError:
    print("Error: ไม่พบไฟล์ private.pem หรือ cipher.bin กรุณาเช็ค path อีกครั้ง")
except Exception as e:
    print(f"An error occurred: {e}")
    
#pip install pycryptodome ก่อนรัน
#https://gchq.github.io/CyberChef/ RSA ดีจัง
#Answer = UNAME{DyNaMiTE007}