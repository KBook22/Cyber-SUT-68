import math

# โจทย์
n, e = 3233, 17
ciphertext = [604, 624, 2412, 690, 3000, 529, 2412, 1773, 538]

# 1. Factor n แบบรวดเร็ว
def factorize(n):
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return i, n // i

p, q = factorize(n)

# 2. คำนวณ d (โดยใช้ pow(e, -1, phi) ใน Python 3.8+)
phi = (p - 1) * (q - 1)
d = pow(e, -1, phi) 

# 3. ถอดรหัสและรวมร่างเป็น String
flag = "".join([chr(pow(c, d, n)) for c in ciphertext])

print(f"p: {p}, q: {q}")
print(f"d: {d}")
print(f"Flag: {flag}")