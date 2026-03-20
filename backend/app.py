import io
import os
import textwrap
from flask import Flask, request, send_file
from flask_cors import CORS
from PIL import Image, ImageDraw, ImageOps, ImageFont

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BASE_DIR)
TEMPLATE_PATH = os.path.join(PROJECT_ROOT, "frontend", "public", "Template.png")


# =========================
# CIRCULAR IMAGE CROP
# =========================
def circular_crop(image, size):
    image = image.convert("RGB")
    image = ImageOps.fit(image, size, centering=(0.5, 0.5))

    mask = Image.new('L', size, 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0) + size, fill=255)

    output = Image.new('RGBA', size, (0, 0, 0, 0))
    output.paste(image, (0, 0))
    output.putalpha(mask)

    return output


# =========================
# FONT LOADER
# =========================
def load_font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except:
        return ImageFont.load_default()


# =========================
# MAIN API
# =========================
@app.route('/api/generate-ticket', methods=['POST'])
def generate_ticket():
    if 'photo' not in request.files or 'name' not in request.form:
        return {"error": "Missing photo or name"}, 400

    photo_file = request.files['photo']
    name = request.form['name'].strip()
    role = request.form.get('role', '').strip()

    try:
        template = Image.open(TEMPLATE_PATH).convert("RGBA")
        draw = ImageDraw.Draw(template)

        # =========================
        # PHOTO (FINAL FIXED POSITION)
        # =========================
        user_img = Image.open(photo_file)

        PROFILE_SIZE = (170, 170)
        profile_pic = circular_crop(user_img, PROFILE_SIZE)

        PHOTO_X = 660
        PHOTO_Y = 260

        template.paste(profile_pic, (PHOTO_X, PHOTO_Y), profile_pic)

        # =========================
        # TEXT AREA (FINAL FIX)
        # =========================
        NAME_X = 200
        NAME_START_Y = 340
        MAX_TEXT_WIDTH = 500

        # =========================
        # NAME FONT (CONTROLLED)
        # =========================
        name_size = 48
        MIN_NAME_SIZE = 30

        while name_size >= MIN_NAME_SIZE:
            font = load_font("arialbd.ttf", name_size)

            try:
                width = font.getlength(name)
            except:
                width = len(name) * name_size * 0.5

            if width <= MAX_TEXT_WIDTH:
                break

            name_size -= 2

        name_font = load_font("arialbd.ttf", name_size)

        # =========================
        # NAME WRAP (MAX 2 LINES)
        # =========================
        name_lines = [name]

        try:
            if name_font.getlength(name) > MAX_TEXT_WIDTH:
                avg_char = name_font.getlength(name) / len(name)
                chars_per_line = int(MAX_TEXT_WIDTH / avg_char)
                name_lines = textwrap.wrap(name, width=chars_per_line)[:2]
        except:
            pass

        # =========================
        # DRAW NAME
        # =========================
        current_y = NAME_START_Y
        LINE_SPACING = name_size + 6

        for line in name_lines:
            draw.text((NAME_X, current_y), line, font=name_font, fill="#FFD700")
            current_y += LINE_SPACING

        # =========================
        # DESIGNATION
        # =========================
        current_y += 15

        if role:
            role_size = int(name_size * 0.45)
            MIN_ROLE_SIZE = 16

            while role_size >= MIN_ROLE_SIZE:
                role_font = load_font("arial.ttf", role_size)

                try:
                    width = role_font.getlength(role)
                except:
                    width = len(role) * role_size * 0.5

                if width <= MAX_TEXT_WIDTH:
                    break

                role_size -= 1

            role_font = load_font("arial.ttf", role_size)

            # Prevent overlap with bottom boxes
            BOTTOM_LIMIT = 540
            if current_y + role_size > BOTTOM_LIMIT:
                current_y = BOTTOM_LIMIT - role_size

            draw.text((NAME_X, current_y), role, font=role_font, fill="#FFFFFF")

        # =========================
        # OUTPUT
        # =========================
        img_io = io.BytesIO()
        template.save(img_io, 'PNG')
        img_io.seek(0)

        user_img.close()
        template.close()

        return send_file(img_io, mimetype='image/png')

    except Exception as e:
        print("ERROR:", e)
        return {"error": str(e)}, 500


# =========================
# RUN
# =========================
if __name__ == '__main__':
    app.run(debug=True, port=5000)