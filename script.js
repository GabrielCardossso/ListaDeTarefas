const lista = document.getElementById('lista-tarefas');
const input = document.getElementById('tarefa-input');
const addBtn = document.getElementById('add-btn');
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function salvarTarefas() {
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function renderizarTarefas() {
  lista.innerHTML = tarefas
    .map((tarefa, index) => `
      <li class="${tarefa.concluida ? 'completed' : ''}" data-index="${index}">
        <span>${tarefa.texto}</span>
        <button class="remover-btn">Excluir</button>
      </li>
    `)
    .join('');

  lista.querySelectorAll('.remover-btn').forEach((btn, i) => {
    btn.addEventListener('click', () => removerTarefa(i));
  });

  lista.querySelectorAll('li span').forEach((span, i) => {
    span.addEventListener('click', () => {
      tarefas[i].concluida = !tarefas[i].concluida;
      salvarTarefas();
      renderizarTarefas();
    });
  });
}

function adicionarTarefa() {
  const texto = input.value.trim();
  if (!texto) return;
  tarefas.push({ texto, concluida: false });
  salvarTarefas();
  renderizarTarefas();
  input.value = '';
}

function removerTarefa(index) {
  const li = lista.querySelector(`li[data-index='${index}']`);
  if (!li) return;

  li.classList.add('removing');
  li.addEventListener('animationend', () => {
    tarefas.splice(index, 1);
    salvarTarefas();
    renderizarTarefas();
  }, { once: true });
}

addBtn.addEventListener('click', adicionarTarefa);
input.addEventListener('keypress', e => { if(e.key === 'Enter') adicionarTarefa(); });

renderizarTarefas();

// Flip sol/lua
const container = document.querySelector('.dark-toggle-container');
container.addEventListener('click', () => {
  container.classList.toggle('flipped');
  document.body.classList.toggle('dark');
});