from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
import hashlib

# Read the encrypted file
with open("flag.png.enc", "rb") as f:
    iv = f.read(16)
    ciphertext = f.read()

# Generate the key from the passphrase
key = hashlib.sha256(b"lnwzaCyber").digest()

# Decrypt the image
cipher = AES.new(key, AES.MODE_CBC, iv)
plaintext = unpad(cipher.decrypt(ciphertext), 16)

# Save the decrypted image
with open("flag.png", "wb") as f:
    f.write(plaintext)

print("✓ Decryption successful!")
print("✓ flag.png has been extracted")