import React from 'react';
import './Announcements.css';

const Announcements = () => {
  const announcementsData = [
    { title: 'Reunião de Pais', message: 'A reunião será realizada no dia 15/10 às 19h.', date: '10/10/2023' },
    { title: 'Feriado', message: 'Não haverá aula no dia 12/10.', date: '10/10/2023' },
  ];

  return (
    <div className="announcements">
      <h3 className="announcements-title">Comunicados</h3>
      <table className="announcements-table">
        <thead>
          <tr className="announcements-header">
            <th>Título</th>
            <th>Mensagem</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {announcementsData.map((announcement, index) => (
            <tr key={index} className="announcements-row">
              <td>{announcement.title}</td>
              <td>{announcement.message}</td>
              <td>{announcement.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Announcements;

