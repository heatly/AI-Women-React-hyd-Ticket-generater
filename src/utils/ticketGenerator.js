/**
 * Ticket Generation Utility (Frontend Edition)
 * Replaces the Python/Pillow backend logic for 100% mobile compatibility.
 */

export const generateTicketCanvas = async (name, role, photoFile) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Config Constants (Matching Python Logic)
    const TEMPLATE_URL = '/Template.png';
    const PHOTO_X = 590; // Shifted left significantly (~3cm from previous)
    const PHOTO_Y = 260;
    const PROFILE_SIZE = 170;
    const NAME_X = 200;
    const NAME_START_Y = 340;
    const MAX_TEXT_WIDTH = 500;
    
    const imgTemplate = new Image();
    const imgUser = new Image();
    
    imgTemplate.crossOrigin = "anonymous";
    imgUser.crossOrigin = "anonymous";
    
    imgTemplate.onload = () => {
      canvas.width = imgTemplate.width;
      canvas.height = imgTemplate.height;
      
      // 1. Draw Template
      ctx.drawImage(imgTemplate, 0, 0);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        imgUser.onload = () => {
          // 2. Draw Circular User Photo
          ctx.save();
          ctx.beginPath();
          ctx.arc(PHOTO_X + PROFILE_SIZE/2, PHOTO_Y + PROFILE_SIZE/2, PROFILE_SIZE/2, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();
          
          // Center-crop logic
          const aspect = imgUser.width / imgUser.height;
          let drawWidth, drawHeight, offsetX = 0, offsetY = 0;
          
          if (aspect > 1) {
            drawHeight = PROFILE_SIZE;
            drawWidth = PROFILE_SIZE * aspect;
            offsetX = -(drawWidth - PROFILE_SIZE) / 2;
          } else {
            drawWidth = PROFILE_SIZE;
            drawHeight = PROFILE_SIZE / aspect;
            offsetY = -(drawHeight - PROFILE_SIZE) / 2;
          }
          
          ctx.drawImage(imgUser, PHOTO_X + offsetX, PHOTO_Y + offsetY, drawWidth, drawHeight);
          ctx.restore();
          
          // 3. Draw Name (Auto-scale)
          let nameSize = 34;
          ctx.fillStyle = "#FFD700"; // Yellow/Gold
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          
          const getFont = (size) => `bold ${size}px Inter, Poppins, Arial`;
          const CENTER_X = PHOTO_X + PROFILE_SIZE / 2;
          const NAME_MAX_WIDTH = 260; // Reduced to fit within borders safely
          
          ctx.font = getFont(nameSize);
          while (ctx.measureText(name).width > NAME_MAX_WIDTH && nameSize > 18) {
            nameSize -= 2;
            ctx.font = getFont(nameSize);
          }
          
          // Handle Text Wrap (Simple)
          let words = name.split(' ');
          let lines = [];
          let currentLine = words[0] || '';
          
          for (let i = 1; i < words.length; i++) {
            if (ctx.measureText(currentLine + " " + words[i]).width < NAME_MAX_WIDTH) {
              currentLine += " " + words[i];
            } else {
              lines.push(currentLine);
              currentLine = words[i];
            }
          }
          if (currentLine) lines.push(currentLine);
          lines = lines.slice(0, 2); // Max 2 lines
          
          let currentY = PHOTO_Y + PROFILE_SIZE + 20;
          lines.forEach(line => {
            ctx.fillText(line, CENTER_X, currentY); // Removed .toUpperCase()
            currentY += nameSize + 8;
          });
          
          // 4. Draw Designation (Role)
          if (role) {
            let roleSize = Math.max(14, Math.floor(nameSize * 0.45));
            ctx.font = `${roleSize}px Inter, Poppins, Arial`;
            
            // Constrain role text width as well
            while (ctx.measureText(role).width > NAME_MAX_WIDTH && roleSize > 10) {
              roleSize -= 1;
              ctx.font = `${roleSize}px Inter, Poppins, Arial`;
            }

            ctx.fillStyle = "#FFFFFF";
            
            currentY += 4;
            // Prevent bottom overlap
            const BOTTOM_LIMIT = 540;
            if (currentY + roleSize > BOTTOM_LIMIT) {
              currentY = BOTTOM_LIMIT - roleSize - 10;
            }
            
            ctx.fillText(role, CENTER_X, currentY);
          }
          
          resolve(canvas.toDataURL('image/png', 1.0));
        };
        imgUser.src = e.target.result;
      };
      reader.readAsDataURL(photoFile);
    };
    
    imgTemplate.onerror = () => reject("Failed to load template image");
    imgTemplate.src = TEMPLATE_URL;
  });
};
