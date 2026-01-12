# 1. ข้อความโฮโลแกรมที่อ่านไม่รู้เรื่อง (Ciphertext)
ciphertext = "}neewteBsdnaLehTnOrekcaHfOdroLehTmAI{GALF"

# 2. ทำการแก้ด้วยการ Slicing String [::-1]
# ความหมายคือ: เริ่มจากต้นจนจบ แต่ก้าวถอยหลังทีละ -1 (อ่านย้อนกลับ)
flag = ciphertext[::-1]

# 3. แสดงผลลัพธ์
print("Input:", ciphertext)
print("-" * 30)
print("Answer:", flag)