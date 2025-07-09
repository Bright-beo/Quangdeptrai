(async function () {
  const resp = await fetch('quiz-data.json');
  const qs = await resp.json();
  const cont = document.getElementById('quiz-container');

  qs.forEach((q, i) => {
    const div = document.createElement('div');
    div.className = 'question';
    div.innerHTML = `<h3>${i + 1}. ${q.question}</h3>`;
    const cdiv = document.createElement('div');
    cdiv.className = 'choices';

    q.choices.forEach(c => {
      const id = `q${i}-${c}`;
      cdiv.innerHTML += `<label><input type="radio" name="q${i}" value="${c}" id="${id}"> ${c}</label>`;
    });

    div.appendChild(cdiv);
    cont.appendChild(div);
  });

  document.getElementById('submit-btn').addEventListener('click', () => {
    let score = 0;
    qs.forEach((q, i) => {
      const sel = document.querySelector(`input[name="q${i}"]:checked`);
      if (sel && sel.value === q.answer) score++;
    });
    const r = document.getElementById('result');
    r.textContent = `Du hast ${score} von ${qs.length} Punkten.`;
    r.style.color = score >= qs.length * 0.6 ? 'green' : 'red';
  });
})();
