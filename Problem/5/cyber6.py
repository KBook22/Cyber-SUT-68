
p = 61
q = 53
n = p * q        # 3233
phi = (p - 1) * (q - 1)  # 3120
e = 17
d = 2753

flag = "W0rkH4rd2"

print("n =", n)
print("e =", e)
print("d =", d)
print()

cipher = []

# Encrypt each character
for ch in flag:
    m = ord(ch)
    c = pow(m, e, n)
    cipher.append(c)

print("[+] Ciphertext:", cipher)

# -----------------------------
# Decrypt
# -----------------------------

result = ""
for c in cipher:
    m = pow(c, d, n)
    result += chr(m)

print("[+] Decrypted flag:", result)
