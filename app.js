let jsonData = {};
let currentSection = 'nba';

// Map of table column definitions per section
const tableConfigs = {
    nba: {
        columns: [
            { key: 'name', label: 'Name' },
            { key: 'team', label: 'Team' },
            { key: 'age', label: 'Age' },
            { key: 'years', label: 'Years' },
            { key: 'war', label: 'WAR' },
            { key: 'per', label: 'PER' },
            { key: 'vorp', label: 'VORP' },
            { key: 'salary', label: 'Salary', format: val => `$${val.toLocaleString()}` },
            { key: 'remaining', label: 'Remaining', format: val => `$${val.toLocaleString()}` }
        ]
    },
    college: {
        columns: [
            { key: 'name', label: 'Name' },
            { key: 'school', label: 'School' },
            { key: 'age', label: 'Age' },
            { key: 'years', label: 'Years' },
            { key: 'war', label: 'WAR' },
            { key: 'per', label: 'PER' },
            { key: 'vorp', label: 'VORP' },
            { key: 'nil', label: 'NIL', format: val => `$${val.toLocaleString()}` }
        ]
    },
    nil: {
        columns: [
            { key: 'name', label: 'Name' },
            { key: 'sport', label: 'Sport' },
            { key: 'school', label: 'School' },
            { key: 'age', label: 'Age' },
            { key: 'y
