import {
  LOGO_URI,
  POPPINS_BOLD,
  POPPINS_MEDIUM,
  EMPTY_IMAGE,
  CAESAR
} from "./base64-uris.js"

export const GenerateIDCode = (collection, count) => {
  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  const role = collection === "MemberShips" ? "MEM" : collection === "Campus Ambassador" ? "CAR" : collection === "Team member Heads" ? "TMH" : "TML";
  if (count <= 0) {
    return `IBF-${role}-A00`;
  }
  const batch = Math.floor((count - 1) / 100) + 1;
  let batchCode;
  if (batch <= 26) {
    batchCode = alphabet[batch - 1];
  } else {
    batchCode = String.fromCharCode(65 + (batch - 1) % 26) + String.fromCharCode(64 + Math.floor((batch - 1) / 26));
  }
  const memberCount = (count - 1) % 100;
  const memberCode = memberCount.toString().padStart(2, '0');
  return `IBF-${role}-${batchCode}${memberCode}`;
}

window.jsPDF = window.jspdf.jsPDF;
const PRIMARY_COLOR = '#10699F';
let doc;

async function getDataUrl(url, dWidth, dHeight) {
  // const Url = url.includes("firebasestorage") ? 'https://cors-anywhere.herokuapp.com/' + url : url.replace("s96-c","s400-c");
  const Url = url.includes("firebasestorage") ? url : url.replace("s96-c","s400-c");

  return new Promise((resolve) => {
    const image = new Image();
    image.crossOrigin = 'annonymus';
    image.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.width = dWidth;
      canvas.height = dHeight;

      const aspectRatio = this.naturalWidth / this.naturalHeight;
      let imgWidth = dWidth;
      let imgHeight = dHeight;
      if (aspectRatio > 1) {
        imgWidth = dWidth * aspectRatio;
      } else {
        imgHeight = dHeight / aspectRatio;
      }

      const ctx = canvas.getContext('2d');
      ctx.drawImage(
        this,
        -(imgWidth - dWidth) / 2,
        -(imgHeight - dHeight) / 2,
        imgWidth,
        imgHeight
      );

      ctx.globalCompositeOperation = 'destination-in';
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(dWidth * 0.5, dHeight * 0.5, dWidth * 0.5, 0, 2 * Math.PI);
      ctx.fill();
      resolve(canvas.toDataURL('image/png'));
    };
    image.onerror = function () {
      resolve(EMPTY_IMAGE);
    };
    image.src = Url;
  });
}

function getQrCodeUrl(text) {
  const qrContainer = document.createElement('div');
  new QRCode(qrContainer, text);
  return qrContainer.querySelector('canvas').toDataURL('image/png');
}

async function generateIdCard(member) {
  doc = new jsPDF({
    orientation: 'portrait',
    unit: 'in',
    format: [2.125, 3.375],
  });

  // add fonts
  doc.addFileToVFS('Poppins-Bold', POPPINS_BOLD);
  doc.addFont('Poppins-Bold', 'Poppins', 'bold');
  doc.addFileToVFS('Poppins-Medium', POPPINS_MEDIUM);
  doc.addFont('Poppins-Medium', 'Poppins', 'medium');
  doc.addFileToVFS('Caesar-Medium', CAESAR);
  doc.addFont('Caesar-Medium', 'Caesar', 'medium');

  doc.addImage(LOGO_URI, 0.807, 0.05, 0.51, 0.51);

  // add company name & address
  doc.setFont('Caesar', 'medium');
  doc.setFontSize(9);
  doc.setTextColor("#006D33");
  doc.text('INDIAN Biomedical Forum', 1.0625, 0.733, null, null, 'center');


  // create background shape
  doc.setFillColor(PRIMARY_COLOR);
  doc.triangle(0, 1.68, 2.125, 1.18, 2.125, 1.68, 'F');
  doc.rect(0, 1.6799, 2.125, 1.697, 'F');

  // profile image
  doc.setFillColor('#fff');
  doc.circle(1.063, 1.447, 0.473, 'F');
  const profileUri = await getDataUrl(member.profileURL, 400, 400);
  doc.addImage(profileUri, 0.633, 1.015, 0.86, 0.86);

  // add member name and designation
  doc.setFont('Poppins', 'bold');
  doc.setFontSize(9);
  doc.setTextColor('#fff');
  doc.text(member.name.toUpperCase(), 1.0625, 2.15, null, null, 'center');

  doc.setFont('Poppins', 'medium');
  doc.setFontSize(5.5);
  doc.text(member.role === "MemberShips" ? "Member" : "Campus Ambassador", 1.0625, 2.267, null, null, 'center');

  doc.setFontSize(6);
  const memberInfo = [{
      label: 'ID code',
      value: member.IDCode,
    },
    {
      label: 'Phone',
      value: member.Mobile,
    },
    {
      label: 'College',
      value: member.collegeShotName,
    },
  ];
  memberInfo.forEach((item, i) => {
    doc.text(item.label, 0.3, 2.5 + 0.167 * i);
    doc.text(':', 0.65, 2.5 + 0.167 * i);
    doc.text(item.value, 0.700, 2.5 + 0.167 * i);
  });

  doc.rect(1.578, 2.846, 0.433, 0.433, 'F');
  const qrCodeUri = getQrCodeUrl("https://www.linkedin.com/company/indian-biomedical-forum-pvt-ltd/");
  doc.addImage(qrCodeUri, 1.613, 2.882, 0.366, 0.366);
  doc.addImage("../asserts/img/sign/ceo-sign.png", 0.135, 2.895, 0.566, 0.366);
  doc.setFont('Poppins', 'medium');
  doc.setFontSize(4);
  doc.setTextColor('#fff');
  doc.text("Founder & CEO", 0.43, 3.279, null, null, 'center');

  // for (const [i, member] of data.entries()) {
  //   if (i > 0) {
  //     doc.addPage();
  //   }


  // }


  return URL.createObjectURL(doc.output('blob'));
}

export async function downloadIdCard(data) {
  const url = await generateIdCard(data);
  if (doc) {
    doc.save('IBF-id-card.pdf');
  }
  if (url) {
    return url;
  } else {
    return null;
  }
}
