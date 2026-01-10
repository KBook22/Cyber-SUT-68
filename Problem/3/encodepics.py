from Crypto.Cipher import AES
from Crypto.Util.Padding import pad

import hashlib , os

key = hashlib.sha256(b"lnwzaCyber").digest()  # 32 bytes

print("Key (SHA-256):", key.hex())
#8315cb86b17ebead61f6e157c34e1978a38d7ab1cd5cd3c274c94755dceada4f


iv = os.urandom(16)
with open("flag.png", "rb") as f:
    plaintext = f.read()

cipher = AES.new(key, AES.MODE_CBC, iv)
ciphertext = cipher.encrypt(pad(plaintext, 16))

with open("flag.png.enc", "wb") as f:
    f.write(iv + ciphertext)