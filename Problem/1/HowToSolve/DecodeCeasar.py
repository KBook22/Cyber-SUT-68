ciphertext = "EbiilPrOxKxobB_rKfsbopfQvDl_qlQbzekl"

def caesar_decrypt(text, shift):
    result = ""
    for ch in text:
        if ch.isalpha():
            base = ord('A') if ch.isupper() else ord('a')
            result += chr((ord(ch) - base + shift) % 26 + base)
        else:
            result += ch
    return result

plaintext = caesar_decrypt(ciphertext, 3)
print("Decrypted:", plaintext)

# run : python ชื่อไฟล์.py
