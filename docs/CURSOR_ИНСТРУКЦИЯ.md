# Инструкция для Cursor — лендинг «Виниры» (stoma)

Главный файл: `Виниры - Лендинг.html`
Все стили — внутри `<style>` в этом же файле (CSS-переменные в `:root`, см. `--gold:#B89968`, `--ink:#211C16`, `--paper:#FFFFFF`, `--hairline:#E6DDCC`, `--sand-soft:#F1E8D7`).

Внесено два блока изменений: **(1) стили кнопок** и **(2) вертикальные отступы**. Ниже — что именно искать и какие значения должны стоять. Если переносишь правки в другой проект — повторить эти же значения.

---

## 1. Кнопки контактов в hero (Telegram / Max / Instagram)

**Цель:** три мессенджер-кнопки визуально равнозначны, светлые, вторичны по отношению к главному CTA. Раньше Telegram был тёмным (`btn-msg-dark`) и выглядел как «уже выбран».

### 1.1 Разметка hero
Все три кнопки используют один класс `btn btn-msg btn-lg <вариант>`. Telegram больше **не** использует `btn-msg-dark`:

```html
<p class="hero-cta-label">Отвечаю лично в удобном для вас мессенджере</p>
<div class="hero-cta">
  <a class="btn btn-msg btn-lg tg" href="#" data-msg="telegram">
    <span class="chip"><svg class="ic" style="width:16px;height:16px"><use href="#i-tg"/></svg></span>
    Написать в Telegram
  </a>
  <a class="btn btn-msg btn-lg max" href="#" data-msg="max"> … </a>
  <a class="btn btn-msg btn-lg ig"  href="#" data-msg="instagram"> … </a>
</div>
```

Добавлена подпись-лейбл над кнопками:
```css
.hero-cta-label{font-size:13.5px;letter-spacing:.01em;color:var(--ink-mute);margin:0 0 14px;font-weight:500}
```

### 1.2 Стиль `.btn-msg` (единый для всех трёх)
- светлый фон `var(--paper)`, тонкая граница `var(--hairline)`, мягкая тень;
- **hover** — золотистая обводка + лёгкое свечение (без агрессивной заливки);
- **active** — золотая заливка только при реальном нажатии.

```css
.btn-msg{
  background: var(--paper); color: var(--ink);
  border:1px solid var(--hairline);
  box-shadow: var(--shadow-soft);
  padding-left:18px;
  transition: transform .18s ease, box-shadow .25s ease, background .25s ease, color .2s ease, border-color .25s ease;
}
.btn-msg:hover{
  background:#FFFDF8;
  border-color: var(--gold);
  box-shadow: 0 0 0 1px rgba(184,153,104,.35), 0 10px 26px -12px rgba(184,153,104,.55);
}
.btn-msg:active{
  background: var(--gold);
  border-color: var(--gold);
  color:#fff;
  box-shadow: inset 0 1px 2px rgba(120,85,30,.25);
}
.btn-msg .chip{ width:30px;height:30px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;flex:none; }
.btn-msg.tg  .chip{ background:#229ED9; color:#fff }
.btn-msg.max .chip{ background:linear-gradient(135deg,#0066FF,#7A3CFF); color:#fff }
.btn-msg.ig  .chip{ background:linear-gradient(135deg,#F58529 0%,#DD2A7B 45%,#8134AF 75%,#515BD4 100%); color:#fff }
```

`.btn-msg-dark` оставлен в CSS, но в hero больше не применяется (используется только в финальном CTA-блоке).

### 1.3 Кнопка «Записаться» (`.btn-primary` в шапке)
По просьбе сделана **идентичной** соседней кнопке «Как проходит» (`.btn-secondary`): тёмный фон убран.

```css
.btn-primary{
  background: var(--paper);
  color: var(--ink);
  box-shadow: var(--shadow-soft);
  border:1px solid var(--hairline);
}
.btn-primary:hover{background:#FFFDF8}
```

---

## 2. Вертикальные отступы — только Desktop (≥1200px)

Между секциями было слишком много воздуха (особенно hero → блок врача: 140px низ hero + 120px верх секции = 260px). Добавлен **один media-блок только для десктопа**. Мобильные (≤720px) и планшеты (721–1199px) **не трогали** — у них остаются базовые значения.

```css
/* desktop vertical-rhythm: −~22% от исходных межсекционных отступов */
@media (min-width:1200px){
  section{padding:94px 0}        /* было 120px */
  .hero{padding:40px 0 86px}     /* было 48px 0 140px */
  .hero-strip{margin-top:54px}   /* было 72px */
  .section-head{margin-bottom:50px} /* было 64px */
  .final{padding:100px 0}        /* было 140px */
}
```

Базовые значения (для tablet/mobile) НЕ менялись:
- `section{padding:120px 0}` + `@media (max-width:720px){ section{padding:80px 0} }`
- `.hero{padding:48px 0 140px}` + mobile `24px 0 70px`
- `.final{padding:140px 0}` + mobile `90px 0`

Итог: переход hero → врач ≈180px вместо 260px, ритм страницы собранный, премиальный воздух сохранён.

---

## Резюме изменений
1. **Кнопки мессенджеров** — единый светлый стиль, золотой hover, active только при нажатии, добавлен лейбл.
2. **«Записаться»** — стала светлой (как «Как проходит»).
3. **Отступы** — десктопный media-блок `@media (min-width:1200px)`, межсекционные расстояния урезаны ~22%, мобайл/планшет без изменений.
