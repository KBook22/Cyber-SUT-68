import os

# กำหนด Path ของไฟล์ Hint
hint_path = '../ProblemGive/hint.txt'

# ตรวจสอบว่ามีไฟล์หรือไม่ (ถ้าไม่มีจะใช้ค่า Default ตามโจทย์)
if not os.path.exists(hint_path):
    print(f"Warning: ไม่พบไฟล์ {hint_path} ใช้ค่า Default จากโจทย์แทน")
    # ค่าจากโจทย์ (รวมบรรทัดใหม่ด้วย \n)
    raw_content = "67 72 69 69 82 76 69 65 68 69 82 \n32 79 78 69 84 87 79 79 78 69 84 87 79 84 72 82 69 \n69 79 78 69 84 87 79 79 78 69 84 87 79 79 78 69"
else:
    print(f"Reading hint from: {hint_path}")
    with open(hint_path, 'r') as f:
        raw_content = f.read()

print("-" * 30)
print("RAW DATA:")
print(raw_content)
print("-" * 30)

# กระบวนการแปลง ASCII -> Text
decoded_text = ""
# แยกตัวเลขออกจากกัน (รองรับทั้ง space และ newline)
numbers = raw_content.split()

for num_str in numbers:
    try:
        # แปลงสตริงเป็นตัวเลขจำนวนเต็ม
        code = int(num_str)
        # แปลงตัวเลขเป็นตัวอักษร (ASCII)
        char = chr(code)
        decoded_text += char
    except ValueError:
        # ข้ามกรณีที่ไม่ใช่ตัวเลข
        pass

print("DECODED TEXT:")
print(decoded_text)
print("-" * 30)

# (Option) แปลงคำอ่านภาษาอังกฤษเป็นตัวเลข เพื่อให้ได้รหัสผ่านสุดท้าย
# CHEERLEADER ONE TWO ONE TWO THREE ONE TWO ONE TWO ONE
word_to_digit = {
    "ONE": "1", "TWO": "2", "THREE": "3", 
    "FOUR": "4", "FIVE": "5", "SIX": "6",
    "SEVEN": "7", "EIGHT": "8", "NINE": "9", "ZERO": "0"
}

final_password = decoded_text
# ลบคำว่า CHEERLEADER ออก (หรือคำอื่นๆ ที่ไม่ใช่ตัวเลข)
# แล้วแทนค่าคำด้วยตัวเลข
for word, digit in word_to_digit.items():
    final_password = final_password.replace(word, digit)

# ลบช่องว่างและตัวอักษรที่เหลือออกให้หมด เพื่อให้เหลือแต่เลขรหัส
final_password = "".join(filter(str.isdigit, final_password))

print(f"FINAL PASSWORD (สำหรับปลดล็อก): {final_password}")