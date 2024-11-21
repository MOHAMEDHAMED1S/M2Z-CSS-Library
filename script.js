
  // تحميل التصميمات على الصفحة الرئيسية
  const container = document.querySelector('.container');
  
  designs.forEach((design) => {
    const card = document.createElement('div');
    card.className = 'card';
  
    // إنشاء معاينة باستخدام iframe مع توسيط التصميم
    const iframe = document.createElement('iframe');
    iframe.className = 'card-preview';
    iframe.sandbox = 'allow-scripts allow-same-origin';  // إضافة sandbox للعزل
  
    iframe.srcdoc = `
      <style>
        body {
          margin: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: #2f2f2f;
        }
.l {
  display: block;
  margin-bottom: 1.5em;
  font-size: 1em;
  position: absolute;
            top: 20px;
            left: 20px;

}

.l {
  background-color: rgba(0,0,0,0.7);
  border-radius: 0.75em;
  box-shadow: 0.125em 0.125em 0 0.125em rgba(0,0,0,0.3) inset;
  color: #fdea7b;
  display: inline-flex;
  align-items: center;
  margin: auto;
  padding: 0.15em;
  width: 3em;
  height: 1.5em;
  transition: background-color 0.1s 0.3s ease-out, box-shadow 0.1s 0.3s ease-out;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.l:before, .l:after {
  content: "";
  display: block;
}

.l:before {
  background-color: #d7d7d7;
  border-radius: 50%;
  width: 1.2em;
  height: 1.2em;
  transition: background-color 0.1s 0.3s ease-out, transform 0.3s ease-out;
  z-index: 1;
}

.l:after {
  background: linear-gradient(transparent 50%, rgba(0,0,0,0.15) 0) 0 50% / 50% 100%,
		repeating-linear-gradient(90deg,#bbb 0,#bbb,#bbb 20%,#999 20%,#999 40%) 0 50% / 50% 100%,
		radial-gradient(circle at 50% 50%,#888 25%, transparent 26%);
  background-repeat: no-repeat;
  border: 0.25em solid transparent;
  border-left: 0.4em solid #d8d8d8;
  border-right: 0 solid transparent;
  transition: border-left-color 0.1s 0.3s ease-out, transform 0.3s ease-out;
  transform: translateX(-22.5%);
  transform-origin: 25% 50%;
  width: 1.2em;
  height: 1em;
  box-sizing: border-box;
}
/* Checked */
.l:checked {
  background-color: rgba(0,0,0,0.45);
  box-shadow: 0.125em 0.125em 0 0.125em rgba(0,0,0,0.1) inset;
}

.l:checked:before {
  background-color: currentColor;
  transform: translateX(125%)
}

.l:checked:after {
  border-left-color: currentColor;
  transform: translateX(-2.5%) rotateY(180deg);
}
/* Other States */
.l:focus {
	/* Usually an anti-A11Y practice but set to remove an annoyance just for this demo */
  outline: 0;
}
        ${design.cssCode}
      </style>
<input type="checkbox" class="l" id="toggle">
      ${design.htmlCode} 

    <script>
    const toggle = document.getElementById('toggle');
    toggle.addEventListener('change', () => {
        if (toggle.checked) {
            document.body.style.backgroundColor = '#ffffff'; // لون رمادي داكن
        } else {
            document.body.style.backgroundColor = '#2f2f2f'; // لون أبيض
        }
    });
</script>
    `;
    
    card.innerHTML = `
      <div class="card-content">
      
        <button class="view-details" onclick="viewDetails(${design.id})"><i class="fa-solid fa-code"></i>    </button>
      </div>
    `;
    
    card.prepend(iframe); // إضافة iframe للمعاينة
    container.appendChild(card);
  });
  // فتح صفحة التفاصيل
  function viewDetails(id) {
    const design = designs.find((d) => d.id === id);
    localStorage.setItem('selectedDesign', JSON.stringify(design));
    window.location.href = 'details.html';
  }

  // استرجاع البيانات من LocalStorage
const design = JSON.parse(localStorage.getItem('selectedDesign'));

// عرض البيانات على الصفحة
document.querySelector('.design-title').textContent = design.title;
document.querySelector('.design-preview').src = design.preview;
document.querySelector('code').innerText = design.htmlCode;