import base64

cipher = "V3BuTnBPbkt6WGR2Z09keEZ6Tw=="

print("=== Step 1: Base64 Decode ===")
step1 = base64.b64decode(cipher).decode()
print("After Base64 decode:", step1)

def caesar_decrypt(text, shift):
    result = ""
    for ch in text:
        if ch.isalpha():
            base = ord('A') if ch.isupper() else ord('a')
            result += chr((ord(ch) - base - shift) % 26 + base)
        else:
            result += ch
    return result    # WpnNpOnKzXdvgOdxFzO

print("\n=== Step 2: Caesar Decrypt ===")
for shift in range(1, 22):  
    decrypted = caesar_decrypt(step1, shift)
    print(f"Shift {shift}: {decrypted}")