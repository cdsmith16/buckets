let playerData = {};

async function loadData() {
  try {
    const response = await fetch('data.json');
    playerData = await response.json();
    renderTable('nba'); // default section
  } catch (err) {
    console.error('Error loading data:', err);
  }
}

function renderTable(section) {
  const tableBody = document.querySelector(`#section-${section} tbody`);
  tableBody.innerHTML = '';

  playerData[section].forEach(player => {
    const tr = document.createElement('tr');
    if (section === 'nba') {
      tr.innerHTML = `
        <td data-label="Name">${player.name}</td>
        <td data-label="Team">${player.team}</td>
        <td data-label="Age">${player.age}</td>
        <td data-label="Years">${player.years}</td>
        <td data-label="WAR">${player.war}</td>
        <td data-label="PER">${player.per}</td>
        <td data-label="VORP">${player.vorp}</td>
        <td data-label="Salary">$${player.salary.toLocaleString()}</td>
        <td data-label="Remaining">$${player.remaining.toLocaleString()}</td>
      `;
    } else if (section === 'college') {
      tr.innerHTML = `
        <td data-label="Name">${player.name}</td>
        <td data-label="School">${player.school}</td>
        <td data-label="Age">${player.age}</td>
        <td data-label="Years">${player.years}</td>
        <td data-label="WAR">${player.war}</td>
        <td data-label="PER">${player.per}</td>
        <td data-label="VORP">${player.vorp}</td>
        <td data-label="NIL">$${player.nil.toLocaleString()}</td>
      `;
    } else if (section === 'nil') {
      tr.innerHTML = `
        <td data-label="Name">${player.name}</td>
        <td data-label="Sport">${player.sport}</td>
        <td data-label="School">${player.school}</td>
        <td data-label="Age">${player.age}</td>
        <td data-label="Years">${player.years}</td>
        <td data-label="NIL">$${player.nil.toLocaleString()}</td>
        <td data-label="Sponsor">${player.sponsor}</td>
      `;
    }
    tableBody.appendChild(tr);
  });
}

function showSection(section) {
  document.querySelectorAll(".content-section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(`section-${section}`).classList.add("active");
  document.querySelectorAll("nav a").forEach(a => a.classList.remove("active"));
  document.querySelector(`nav a[data-section="${section}"]`).classList.add("active");
  renderTable(section);
}

document.addEventListener('DOMContentLoaded', loadData);