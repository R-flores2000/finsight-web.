// ---------- GRÁFICA DE MERCADO SIMULADA ----------
const canvas = document.getElementById('marketChart');
const ctx = canvas.getContext('2d');

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
let time = 0;

function drawMarket() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  for (let x = 0; x < canvas.width; x++) {
    const y = canvas.height / 2 + Math.sin(x * 0.015 + time) * 30;
    ctx.lineTo(x, y);
  }
  ctx.strokeStyle = '#00ffe7';
  ctx.lineWidth = 2;
  ctx.shadowColor = '#00ffe7';
  ctx.shadowBlur = 10;
  ctx.stroke();
  time += 0.03;
  requestAnimationFrame(drawMarket);
}

drawMarket();

// ---------- SPARKLINES EN COMPARATIVA ----------
document.querySelectorAll('.sparkline').forEach(canvas => {
  const ctx = canvas.getContext('2d');
  const points = 20;
  let price = 100 + Math.random() * 20;
  const data = Array.from({ length: points }, () => {
    price += (Math.random() - 0.5) * 2;
    return price;
  });

  const min = Math.min(...data);
  const max = Math.max(...data);
  const h = canvas.height, w = canvas.width;
  ctx.strokeStyle = '#00ffe7';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  data.forEach((val, i) => {
    const x = (i / (points - 1)) * w;
    const y = h - ((val - min) / (max - min)) * h;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.stroke();
});

// ---------- PANEL DE USUARIO ----------
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const panel = document.getElementById('user-panel');
  const closeBtn = document.getElementById('close-panel');

  hamburger.addEventListener('click', () => {
    panel.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
  closeBtn.addEventListener('click', () => panel.classList.remove('open'));
});

// ---------- CHATBOT BÁSICO CON RESPUESTAS PREDETERMINADAS ----------
const bubble = document.getElementById('chat-bubble');
const win = document.getElementById('chat-window');
const msgs = document.getElementById('chat-messages');
const input = document.getElementById('chat-input');
const send = document.getElementById('chat-send');

bubble.addEventListener('click', () => {
  win.style.display = win.style.display === 'flex' ? 'none' : 'flex';
  if (win.style.display === 'flex' && msgs.childElementCount === 0) {
    botMessage('¡Hola! Soy tu asistente FinSight. Pregunta sobre la plataforma.');
  }
});

function botMessage(text) {
  const div = document.createElement('div');
  div.className = 'chat-message bot';
  div.textContent = text;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function userMessage(text) {
  const div = document.createElement('div');
  div.className = 'chat-message user';
  div.textContent = text;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

send.addEventListener('click', () => handleMessage());
input.addEventListener('keypress', e => {
  if (e.key === 'Enter') handleMessage();
});

function handleMessage() {
  const text = input.value.trim();
  if (!text) return;
  userMessage(text);
  input.value = '';
  setTimeout(() => botResponse(text.toLowerCase()), 500);
}

function botResponse(msg) {
  if (msg.includes('mision')) {
    botMessage('Nuestra misión es proveer información para decisiones de inversión claras y confiables.');
  } else if (msg.includes('vision')) {
    botMessage('Queremos ser líderes en Honduras ofreciendo acceso a educación financiera de calidad.');
  } else if (msg.includes('valores')) {
    botMessage('Nuestros valores son transparencia, simplicidad de uso, innovación con propósito, empoderamiento digital y responsabilidad.');
  } else if (msg.includes('educacion')) {
    botMessage('Contamos con módulos didácticos sobre inversiones, análisis técnico, y gestión de riesgos.');
  } else if (msg.includes('contacto')) {
    botMessage('Puedes contactarnos al correo info@finsight.com o seguirnos en redes sociales.');
  } else {
    botMessage('Lo siento, no entendí tu pregunta. Puedes preguntar sobre misión, visión, valores o módulos educativos.');
  }
}

// ----- Lógica del foro (comentarios básicos) -----
document.addEventListener("DOMContentLoaded", () => {
  const formForo = document.getElementById("foro-form");
  const nombreInput = document.getElementById("nombre");
  const comentarioInput = document.getElementById("comentario");
  const comentariosDiv = document.querySelector(".comentarios");

  formForo.addEventListener("submit", function (e) {
    e.preventDefault(); // evita que recargue o salte
    const nombre = nombreInput.value.trim();
    const comentario = comentarioInput.value.trim();
    if (!nombre || !comentario) return;

    const div = document.createElement("div");
    div.classList.add("comentario");
    div.innerHTML = `<strong>${nombre}:</strong> ${comentario}`;
    comentariosDiv.appendChild(div);

    nombreInput.value = "";
    comentarioInput.value = "";
  });
});

const lista = document.getElementById("lista-conceptos");
const buscador = document.getElementById("buscador");

function renderizarConceptos(filtro = "") {
  lista.innerHTML = "";
  const filtrados = conceptosFinancieros.filter(c =>
    c.termino.toLowerCase().includes(filtro.toLowerCase())
  );

  filtrados.forEach(c => {
    const contenedor = document.createElement("div");
    contenedor.classList.add("concepto-item");

    const titulo = document.createElement("h3");
    titulo.textContent = c.termino;
    titulo.classList.add("termino");
    contenedor.appendChild(titulo);

    const definicion = document.createElement("div");
    definicion.classList.add("definicion");
    definicion.innerHTML = `<p>${c.definicion}</p><small><strong>Fuente:</strong> <a href="${c.fuente}" target="_blank">${c.fuente}</a></small>`;
    definicion.style.display = "none";
    contenedor.appendChild(definicion);

    titulo.addEventListener("click", () => {
      definicion.style.display = definicion.style.display === "none" ? "block" : "none";
    });

    lista.appendChild(contenedor);
  });

  if (filtrados.length === 0) {
    lista.innerHTML = "<p>No se encontraron resultados.</p>";
  }
}

buscador.addEventListener("input", e => {
  renderizarConceptos(e.target.value);
});

document.addEventListener("DOMContentLoaded", () => {
  renderizarConceptos();
});

const conceptosFinancieros = [
  { termino: "Activo", definicion: "Bien o recurso con valor económico.", fuente: "Investopedia" },
  { termino: "Pasivo", definicion: "Obligación financiera o deuda.", fuente: "CNMV" },
  { termino: "Volatilidad", definicion: "Medida del cambio de precio de un activo.", fuente: "BBVA" },
  { termino: "Liquidez", definicion: "Facilidad para convertir un activo en efectivo.", fuente: "Banco de España" },
  { termino: "Diversificación", definicion: "Reducción del riesgo al invertir en diferentes activos.", fuente: "Investopedia" },
  { termino: "Rentabilidad", definicion: "Ganancia que produce una inversión.", fuente: "BBVA" },
  { termino: "Inflación", definicion: "Aumento sostenido de precios en una economía.", fuente: "Banco de España" },
  { termino: "Criptomoneda", definicion: "Moneda digital descentralizada.", fuente: "Investopedia" },
  { termino: "Acción", definicion: "Parte proporcional del capital de una empresa.", fuente: "CNMV" },
  { termino: "Interés compuesto", definicion: "Interés calculado sobre el capital e intereses previos.", fuente: "CNMV" },
  { termino: "Bonos", definicion: "Instrumento de deuda emitido por entidades públicas o privadas.", fuente: "Investopedia" },
  { termino: "Capital", definicion: "Recursos financieros disponibles para inversión.", fuente: "Banco de España" },
  { termino: "Dividendos", definicion: "Ganancias distribuidas a los accionistas.", fuente: "BBVA" },
  { termino: "ETF", definicion: "Fondo cotizado que replica un índice.", fuente: "Investopedia" },
  { termino: "Fondo de inversión", definicion: "Instrumento que agrupa capital de múltiples inversores.", fuente: "CNMV" },
  { termino: "Broker", definicion: "Intermediario financiero entre comprador y mercado.", fuente: "Investopedia" },
  { termino: "Apalancamiento", definicion: "Uso de deuda para aumentar la inversión.", fuente: "BBVA" },
  { termino: "Stop-loss", definicion: "Orden para vender un activo y limitar pérdidas.", fuente: "Investopedia" },
  { termino: "Tick", definicion: "Movimiento mínimo en el precio de un activo.", fuente: "CNMV" },
  { termino: "Índice bursátil", definicion: "Medida del comportamiento de un grupo de acciones.", fuente: "Banco de España" },
  { termino: "Beta", definicion: "Indicador del riesgo de una acción comparado con el mercado.", fuente: "Investopedia" },
  { termino: "Riesgo", definicion: "Probabilidad de pérdida en una inversión.", fuente: "CNMV" },
  { termino: "Valuación", definicion: "Estimación del valor de un activo o empresa.", fuente: "Investopedia" },
  { termino: "Ratio P/E", definicion: "Relación entre el precio de una acción y sus ganancias.", fuente: "Investopedia" },
  { termino: "Correlación", definicion: "Relación estadística entre dos activos.", fuente: "Investopedia" },
  { termino: "Mercado alcista", definicion: "Periodo prolongado de subida de precios en el mercado.", fuente: "Investopedia" },
  { termino: "Mercado bajista", definicion: "Periodo prolongado de caída de precios en el mercado.", fuente: "Investopedia" },
  { termino: "Liquidez del mercado", definicion: "Facilidad para comprar o vender activos sin afectar su precio.", fuente: "BBVA" },
  { termino: "Spread", definicion: "Diferencia entre el precio de compra y venta de un activo.", fuente: "Investopedia" },
  { termino: "Volumen", definicion: "Cantidad de unidades de un activo negociadas en un periodo.", fuente: "CNMV" },
  { termino: "Apreciación", definicion: "Incremento del valor de un activo con el tiempo.", fuente: "Investopedia" },
  { termino: "Depreciación", definicion: "Disminución del valor de un activo con el tiempo.", fuente: "BBVA" },
  { termino: "Tasa de interés", definicion: "Costo del dinero prestado o rendimiento de una inversión.", fuente: "Banco de España" },
  { termino: "Inflación subyacente", definicion: "Inflación que excluye los precios más volátiles.", fuente: "Investopedia" },
  { termino: "CDT", definicion: "Certificado de Depósito a Término. Inversión fija con rentabilidad pactada.", fuente: "BBVA" },
  { termino: "ROE", definicion: "Retorno sobre el capital. Mide la rentabilidad del capital invertido.", fuente: "Investopedia" },
  { termino: "ROA", definicion: "Rentabilidad sobre activos. Evalúa eficiencia del uso de activos.", fuente: "Investopedia" },
  { termino: "Capitalización bursátil", definicion: "Valor total de una empresa según el mercado.", fuente: "Investopedia" },
  { termino: "Crédito", definicion: "Acuerdo donde un prestatario recibe dinero y lo devuelve luego con interés.", fuente: "Banco de España" },
  { termino: "Derivado financiero", definicion: "Contrato cuyo valor depende del de otro activo subyacente.", fuente: "Investopedia" },
  { termino: "Swap", definicion: "Contrato para intercambiar flujos financieros futuros.", fuente: "Investopedia" },
  { termino: "Opciones", definicion: "Contrato que da derecho a comprar o vender un activo a un precio específico.", fuente: "Investopedia" },
  { termino: "Prima", definicion: "Precio que paga el comprador de una opción al vendedor.", fuente: "CNMV" },
  { termino: "Flujo de caja", definicion: "Movimiento de dinero entrante y saliente de una empresa.", fuente: "BBVA" },
  { termino: "Valor presente neto", definicion: "Valor actual de los flujos futuros descontados al presente.", fuente: "Investopedia" },
  { termino: "TIR", definicion: "Tasa Interna de Retorno. Mide la rentabilidad de una inversión.", fuente: "Investopedia" },
  { termino: "Punto de equilibrio", definicion: "Nivel donde los ingresos igualan los costos totales.", fuente: "CNMV" },
  { termino: "Ratio de cobertura", definicion: "Mide la capacidad de cubrir las obligaciones financieras.", fuente: "Investopedia" }
];

conceptosFinancieros.push(
  { termino: "Fondos indexados", definicion: "Fondos que replican un índice bursátil específico, como el S&P 500.", fuente: "Investopedia" },
  { termino: "Comisión de gestión", definicion: "Cargo cobrado por la administración de un fondo de inversión.", fuente: "BBVA" },
  { termino: "Costo de oportunidad", definicion: "Beneficio que se deja de obtener al elegir una opción en lugar de otra.", fuente: "Investopedia" },
  { termino: "Oferta pública de adquisición (OPA)", definicion: "Propuesta de compra de acciones hecha por una empresa a los accionistas de otra.", fuente: "CNMV" },
  { termino: "Oferta pública de venta (OPV)", definicion: "Emisión de acciones por parte de una empresa para salir a bolsa.", fuente: "CNMV" },
  { termino: "Precio objetivo", definicion: "Precio estimado al que se espera que llegue una acción en el futuro.", fuente: "Investopedia" },
  { termino: "Split de acciones", definicion: "División de una acción en varias para aumentar su liquidez.", fuente: "BBVA" },
  { termino: "Capital flotante", definicion: "Porcentaje de acciones de una empresa que están disponibles para el mercado.", fuente: "CNMV" },
  { termino: "Capital social", definicion: "Valor del conjunto de aportes hechos por los socios o accionistas de una empresa.", fuente: "Banco de España" },
  { termino: "Prima de riesgo", definicion: "Diferencia entre la rentabilidad de un bono de un país y la de otro más seguro.", fuente: "Investopedia" },
  { termino: "Mercado primario", definicion: "Donde se emiten nuevos activos financieros por primera vez.", fuente: "CNMV" },
  { termino: "Mercado secundario", definicion: "Mercado donde se negocian activos previamente emitidos.", fuente: "Investopedia" },
  { termino: "Ratio de endeudamiento", definicion: "Indica el porcentaje de deuda sobre el capital total de una empresa.", fuente: "BBVA" },
  { termino: "Depósito a plazo", definicion: "Producto de ahorro con un plazo determinado y rentabilidad fija.", fuente: "Banco de España" },
  { termino: "Inflación esperada", definicion: "Inflación que los agentes económicos anticipan para el futuro.", fuente: "CNMV" },
  { termino: "Activo subyacente", definicion: "Activo sobre el cual se basa un derivado financiero, como una opción o futuro.", fuente: "Investopedia" },
  { termino: "Cobertura (hedge)", definicion: "Estrategia para reducir o eliminar el riesgo financiero.", fuente: "Investopedia" },
  { termino: "Short selling (venta en corto)", definicion: "Venta de activos prestados con la expectativa de comprarlos más baratos luego.", fuente: "Investopedia" },
  { termino: "Liquidez bancaria", definicion: "Capacidad de una entidad bancaria para hacer frente a sus obligaciones a corto plazo.", fuente: "Banco de España" },
  { termino: "Tasa Libor", definicion: "Tasa de interés interbancaria de referencia, ahora reemplazada en muchos países por SOFR.", fuente: "Investopedia" },
  { termino: "Valor intrínseco", definicion: "Valor real estimado de un activo según análisis fundamental.", fuente: "Investopedia" },
  { termino: "Ratio de solvencia", definicion: "Capacidad de una empresa para pagar sus deudas a largo plazo.", fuente: "BBVA" },
  { termino: "Ratio de liquidez", definicion: "Capacidad de una empresa para pagar sus obligaciones a corto plazo.", fuente: "Investopedia" },
  { termino: "Interés simple", definicion: "Interés calculado solo sobre el capital inicial.", fuente: "Banco de España" },
  { termino: "Rendimiento esperado", definicion: "Estimación de la ganancia probable de una inversión.", fuente: "Investopedia" },
  { termino: "Cuenta remunerada", definicion: "Cuenta bancaria que genera intereses sobre el saldo.", fuente: "BBVA" },
  { termino: "Fitch Ratings", definicion: "Agencia calificadora de riesgo financiero.", fuente: "Investopedia" },
  { termino: "Moody’s", definicion: "Agencia de calificación de deuda y riesgo financiero.", fuente: "Investopedia" },
  { termino: "Standard & Poor’s (S&P)", definicion: "Agencia calificadora y creadora del índice S&P 500.", fuente: "Investopedia" },
  { termino: "ROIC", definicion: "Retorno sobre capital invertido. Mide eficiencia en el uso del capital total.", fuente: "Investopedia" },
  { termino: "Valor contable", definicion: "Valor neto de una empresa según sus estados financieros.", fuente: "CNMV" },
  { termino: "Riesgo sistémico", definicion: "Riesgo de que una falla en una institución afecte a todo el sistema financiero.", fuente: "Investopedia" },
  { termino: "Riesgo país", definicion: "Riesgo asociado a invertir en un país específico por factores políticos o económicos.", fuente: "BBVA" },
  { termino: "Plan de pensiones", definicion: "Instrumento de ahorro a largo plazo para la jubilación.", fuente: "Banco de España" },
  { termino: "Vencimiento", definicion: "Fecha límite de pago de una deuda o final de una inversión a plazo.", fuente: "Investopedia" },
  { termino: "Holding", definicion: "Empresa que posee la mayoría de acciones de otras compañías.", fuente: "CNMV" },
  { termino: "OPA hostil", definicion: "Intento de compra de una empresa sin el consentimiento de su junta directiva.", fuente: "Investopedia" },
  { termino: "Amortización", definicion: "Reducción contable del valor de un activo a lo largo del tiempo.", fuente: "Banco de España" },
  { termino: "Valor de rescate", definicion: "Cantidad que se recupera al cancelar anticipadamente una inversión o seguro.", fuente: "Investopedia" },
  { termino: "Benchmark", definicion: "Índice de referencia usado para evaluar el desempeño de una inversión.", fuente: "Investopedia" },
  { termino: "Split inverso", definicion: "Reducción en el número de acciones en circulación sin alterar el valor total.", fuente: "Investopedia" },
  { termino: "Inversión pasiva", definicion: "Estrategia que busca replicar el mercado en lugar de superarlo.", fuente: "Investopedia" },
  { termino: "Inversión activa", definicion: "Estrategia que busca superar el rendimiento del mercado mediante análisis continuo.", fuente: "Investopedia" },
  { termino: "Valor nominal", definicion: "Valor original asignado a un activo o título al ser emitido.", fuente: "CNMV" },
  { termino: "Split ajustado", definicion: "Modificación del precio de las acciones para mantener coherencia tras un split.", fuente: "Investopedia" },
  { termino: "Ratio de Sharpe", definicion: "Mide la rentabilidad ajustada al riesgo de una inversión.", fuente: "Investopedia" },
  { termino: "Ratio de Treynor", definicion: "Evalúa el exceso de rentabilidad por unidad de riesgo sistemático.", fuente: "Investopedia" }
);

conceptosFinancieros.push(
  { termino: "Fondo de cobertura", definicion: "Fondo de inversión que emplea estrategias avanzadas como el apalancamiento o derivados.", fuente: "Investopedia" },
  { termino: "Ratio de eficiencia", definicion: "Mide la relación entre gastos operativos e ingresos netos.", fuente: "BBVA" },
  { termino: "Burbuja financiera", definicion: "Situación en la que el precio de un activo se dispara por encima de su valor real.", fuente: "Investopedia" },
  { termino: "Credit default swap (CDS)", definicion: "Instrumento financiero para cubrir riesgo de impago de deuda.", fuente: "Investopedia" },
  { termino: "Fusión empresarial", definicion: "Unión de dos o más empresas para formar una sola entidad.", fuente: "CNMV" },
  { termino: "Adquisición", definicion: "Compra de una empresa por parte de otra.", fuente: "CNMV" },
  { termino: "Valor de mercado", definicion: "Precio al que se negocia un activo en el mercado abierto.", fuente: "Investopedia" },
  { termino: "Mercado emergente", definicion: "País o región con economías en desarrollo que ofrecen oportunidades y riesgos.", fuente: "BBVA" },
  { termino: "Fondo soberano", definicion: "Fondo estatal que invierte los excedentes de reservas de un país.", fuente: "Investopedia" },
  { termino: "Capital riesgo", definicion: "Inversión en empresas emergentes con alto potencial y riesgo.", fuente: "CNMV" },
  { termino: "Due diligence", definicion: "Proceso de auditoría previo a una inversión o adquisición.", fuente: "Investopedia" },
  { termino: "Valor residual", definicion: "Valor estimado de un activo al final de su vida útil.", fuente: "Banco de España" },
  { termino: "Margen bruto", definicion: "Ingresos menos costo de ventas, antes de gastos operativos.", fuente: "Investopedia" },
  { termino: "Margen neto", definicion: "Beneficio neto dividido entre los ingresos totales.", fuente: "Investopedia" },
  { termino: "Flotación en bolsa", definicion: "Proceso mediante el cual una empresa ofrece acciones al público.", fuente: "CNMV" },
  { termino: "Acciones preferentes", definicion: "Acciones que otorgan prioridad en dividendos pero no en voto.", fuente: "Investopedia" },
  { termino: "Acciones ordinarias", definicion: "Acciones con derecho a voto y participación en dividendos.", fuente: "Investopedia" },
  { termino: "Emisión de deuda", definicion: "Proceso mediante el cual una entidad lanza bonos al mercado.", fuente: "Banco de España" },
  { termino: "Calificación crediticia", definicion: "Evaluación del riesgo de impago de una entidad emisora.", fuente: "Fitch Ratings" },
  { termino: "Rendimiento del bono", definicion: "Rentabilidad anual que ofrece un bono en relación a su precio actual.", fuente: "Investopedia" },
  { termino: "Duración del bono", definicion: "Medida de la sensibilidad del precio de un bono ante variaciones en la tasa de interés.", fuente: "Investopedia" },
  { termino: "Interés variable", definicion: "Tipo de interés que cambia en función de un índice de referencia.", fuente: "Banco de España" },
  { termino: "Interés fijo", definicion: "Tipo de interés que se mantiene constante durante todo el plazo del préstamo.", fuente: "Banco de España" },
  { termino: "Deuda subordinada", definicion: "Tipo de deuda que se paga después de otras obligaciones en caso de quiebra.", fuente: "CNMV" },
  { termino: "Patrimonio neto", definicion: "Diferencia entre el total de activos y el total de pasivos de una empresa.", fuente: "Investopedia" },
  { termino: "Valor ajustado", definicion: "Valor de un activo tras considerar factores como inflación o split.", fuente: "Investopedia" },
  { termino: "Amortización anticipada", definicion: "Pago de una deuda antes de la fecha pactada.", fuente: "Banco de España" },
  { termino: "Penalización por cancelación", definicion: "Cargo por pagar un préstamo o producto financiero antes de tiempo.", fuente: "Banco de España" },
  { termino: "Riesgo de liquidez", definicion: "Riesgo de no poder vender un activo rápidamente sin perder valor.", fuente: "Investopedia" },
  { termino: "Fondo garantizado", definicion: "Fondo que asegura la recuperación del capital invertido si se cumple una condición.", fuente: "CNMV" },
  { termino: "Fondo mixto", definicion: "Fondo que invierte en varios tipos de activos: renta fija y variable.", fuente: "Investopedia" },
  { termino: "Fondo monetario", definicion: "Fondo que invierte en activos de muy bajo riesgo y alta liquidez.", fuente: "CNMV" },
  { termino: "Fondo de renta fija", definicion: "Fondo que invierte principalmente en bonos y deuda pública.", fuente: "Investopedia" },
  { termino: "Fondo de renta variable", definicion: "Fondo que invierte principalmente en acciones de empresas.", fuente: "CNMV" },
  { termino: "Agencia de valores", definicion: "Entidad autorizada para operar con valores financieros por cuenta ajena.", fuente: "CNMV" },
  { termino: "Sociedad de valores", definicion: "Entidad que presta servicios de inversión y puede operar por cuenta propia o ajena.", fuente: "CNMV" },
  { termino: "Mercado regulado", definicion: "Mercado financiero que opera bajo supervisión oficial y normas estrictas.", fuente: "Banco de España" },
  { termino: "Mercado no regulado", definicion: "Mercado financiero que opera fuera de entornos oficiales y con menos requisitos.", fuente: "Investopedia" },
  { termino: "Mercado OTC", definicion: "Mercado extrabursátil donde se negocian valores directamente entre partes.", fuente: "Investopedia" },
  { termino: "Microcapitalización", definicion: "Empresa con muy baja capitalización bursátil (menor a $300M USD).", fuente: "Investopedia" },
  { termino: "Small cap", definicion: "Empresa de pequeña capitalización (entre $300M y $2B USD).", fuente: "Investopedia" },
  { termino: "Mid cap", definicion: "Empresa de capitalización media (entre $2B y $10B USD).", fuente: "Investopedia" },
  { termino: "Large cap", definicion: "Empresa de gran capitalización (más de $10B USD).", fuente: "Investopedia" },
  { termino: "Volumen medio diario", definicion: "Promedio diario de acciones negociadas de un valor en un periodo.", fuente: "Investopedia" },
  { termino: "Rotación de cartera", definicion: "Frecuencia con que los activos de un fondo son comprados o vendidos.", fuente: "CNMV" },
  { termino: "Benchmarked ETF", definicion: "ETF que replica un índice específico como referencia de rendimiento.", fuente: "Investopedia" },
  { termino: "Ciclo económico", definicion: "Fases de expansión y contracción que atraviesa una economía.", fuente: "BBVA" },
  { termino: "PIB", definicion: "Producto Interno Bruto. Mide el valor total de bienes y servicios de un país.", fuente: "Banco de España" },
  { termino: "Déficit fiscal", definicion: "Situación donde los gastos del gobierno superan sus ingresos.", fuente: "Banco de España" }
);
conceptosFinancieros.push(
  { termino: "Superávit fiscal", definicion: "Situación en la que los ingresos del gobierno superan sus gastos.", fuente: "Banco de España" },
  { termino: "Tasa de crecimiento", definicion: "Variación porcentual del valor de una variable económica en un periodo.", fuente: "BBVA" },
  { termino: "Política monetaria", definicion: "Conjunto de medidas del banco central para controlar la inflación y el crecimiento.", fuente: "Banco de España" },
  { termino: "Política fiscal", definicion: "Acciones del gobierno sobre impuestos y gasto público para influir en la economía.", fuente: "BBVA" },
  { termino: "Demanda agregada", definicion: "Demanda total de bienes y servicios en una economía.", fuente: "Investopedia" },
  { termino: "Oferta agregada", definicion: "Cantidad total de bienes y servicios que las empresas están dispuestas a ofrecer.", fuente: "Investopedia" },
  { termino: "Curva de Phillips", definicion: "Relación inversa entre desempleo e inflación.", fuente: "Investopedia" },
  { termino: "Índice de precios al consumidor (IPC)", definicion: "Indicador que mide la evolución de los precios de bienes y servicios de consumo.", fuente: "Banco de España" },
  { termino: "Índice de precios al productor (IPP)", definicion: "Mide la variación de precios que reciben los productores por sus bienes.", fuente: "Investopedia" },
  { termino: "Recesión", definicion: "Periodo prolongado de caída en la actividad económica.", fuente: "Investopedia" },
  { termino: "Depresión económica", definicion: "Caída severa y sostenida de la actividad económica.", fuente: "Investopedia" },
  { termino: "Estanflación", definicion: "Situación en la que coexisten inflación alta y estancamiento económico.", fuente: "Investopedia" },
  { termino: "Índice de confianza del consumidor", definicion: "Mide el grado de optimismo de los consumidores sobre la economía.", fuente: "Investopedia" },
  { termino: "Tipo de cambio", definicion: "Relación entre el valor de dos monedas.", fuente: "Banco de España" },
  { termino: "Tipo de cambio flotante", definicion: "Valor de una moneda determinado por el mercado libremente.", fuente: "Investopedia" },
  { termino: "Tipo de cambio fijo", definicion: "Valor de una moneda establecido por el gobierno o banco central.", fuente: "Investopedia" },
  { termino: "Paridad de poder adquisitivo", definicion: "Teoría que compara los niveles de precios entre países.", fuente: "Investopedia" },
  { termino: "Balanzas de pagos", definicion: "Registro de todas las transacciones económicas de un país con el exterior.", fuente: "Banco de España" },
  { termino: "Cuenta corriente", definicion: "Parte de la balanza de pagos que incluye exportaciones, importaciones e ingresos primarios y secundarios.", fuente: "Investopedia" },
  { termino: "Cuenta de capital", definicion: "Mide las transferencias de capital y adquisición/disposición de activos no financieros no producidos.", fuente: "Investopedia" },
  { termino: "Reserva internacional", definicion: "Activos externos mantenidos por el banco central para respaldar su moneda.", fuente: "Banco de España" },
  { termino: "Balanza comercial", definicion: "Diferencia entre exportaciones e importaciones de bienes.", fuente: "Investopedia" },
  { termino: "Tasa de desempleo", definicion: "Porcentaje de la población activa que busca trabajo y no lo encuentra.", fuente: "BBVA" },
  { termino: "Productividad", definicion: "Relación entre la producción obtenida y los recursos utilizados.", fuente: "Banco de España" },
  { termino: "Capital humano", definicion: "Conjunto de conocimientos, habilidades y experiencias de las personas.", fuente: "Investopedia" },
  { termino: "Índice bursátil", definicion: "Medida del rendimiento promedio de un grupo de acciones seleccionadas.", fuente: "Investopedia" },
  { termino: "Dow Jones", definicion: "Uno de los índices bursátiles más antiguos de EE. UU., incluye 30 empresas.", fuente: "Investopedia" },
  { termino: "Nasdaq", definicion: "Índice que agrupa principalmente empresas tecnológicas.", fuente: "Investopedia" },
  { termino: "S&P 500", definicion: "Índice que agrupa las 500 principales empresas de EE. UU.", fuente: "Investopedia" },
  { termino: "Eurostoxx 50", definicion: "Índice bursátil que agrupa 50 empresas líderes de la eurozona.", fuente: "Investopedia" },
  { termino: "Índice MSCI", definicion: "Serie de índices bursátiles utilizados para medir mercados internacionales.", fuente: "Investopedia" },
  { termino: "Valor de mercado ajustado", definicion: "Valor de un activo corregido según eventos como dividendos, splits, etc.", fuente: "Investopedia" },
  { termino: "Riesgo crediticio", definicion: "Posibilidad de que un prestatario no cumpla con sus obligaciones.", fuente: "CNMV" },
  { termino: "Titulización", definicion: "Agrupación de activos financieros para convertirlos en valores negociables.", fuente: "Investopedia" },
  { termino: "Activo tóxico", definicion: "Activo financiero que ha perdido su valor y es difícil de vender.", fuente: "Investopedia" },
  { termino: "Morosidad", definicion: "Retraso en el pago de una deuda respecto a lo pactado.", fuente: "Banco de España" },
  { termino: "Intermediación financiera", definicion: "Actividad de canalizar el ahorro hacia la inversión mediante entidades financieras.", fuente: "BBVA" },
  { termino: "Renta fija", definicion: "Tipo de inversión que ofrece pagos periódicos y retorno del capital.", fuente: "CNMV" },
  { termino: "Renta variable", definicion: "Tipo de inversión cuyo rendimiento no está garantizado.", fuente: "CNMV" },
  { termino: "Riesgo de mercado", definicion: "Posibilidad de sufrir pérdidas por variaciones en precios del mercado.", fuente: "Investopedia" },
  { termino: "Riesgo operacional", definicion: "Riesgo de pérdida por errores humanos, fallos técnicos o procesos internos.", fuente: "Investopedia" },
  { termino: "Fitch", definicion: "Agencia internacional de calificación de crédito.", fuente: "Investopedia" },
  { termino: "Inversión extranjera directa", definicion: "Adquisición de activos o empresas por parte de inversionistas extranjeros.", fuente: "Banco de España" },
  { termino: "Inversión de cartera", definicion: "Inversión en instrumentos financieros sin control directo de la empresa.", fuente: "Investopedia" },
  { termino: "Subvención", definicion: "Ayuda económica otorgada por el estado para fomentar actividades específicas.", fuente: "BBVA" },
  { termino: "Empleo informal", definicion: "Actividad laboral sin contratos ni prestaciones legales.", fuente: "Banco de España" },
  { termino: "Economía sumergida", definicion: "Conjunto de actividades no registradas en las estadísticas oficiales.", fuente: "BBVA" },
  { termino: "Estímulo fiscal", definicion: "Medidas del gobierno para incentivar la economía mediante gasto o reducción de impuestos.", fuente: "Banco de España" },
  { termino: "Gasto público", definicion: "Dinero que el estado utiliza para satisfacer las necesidades colectivas.", fuente: "Banco de España" },
  { termino: "Deuda pública", definicion: "Conjunto de obligaciones financieras del Estado frente a terceros.", fuente: "Banco de España" }
);
