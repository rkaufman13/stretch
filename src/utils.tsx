const videos = [
    'AuSW66huFoo', 'a5KrWZXLBbA', 'BtUTVjozCEk',
    'WsIs87By-a8', 'guOj99WPZnw', 'B9uY01NoqBg',
    'eN7-WvIp37E', '9MYWtJgthRc', 'rf-D69zArkE',
    'CCzZC0xgWSo', 'QY4gCIYbGQk', 'mT-3b4rgRzg',
    'T8tY7bq5eKg', 'w24t5yPYnIY', 'YfjeXeiREic',
    'BHa63RBe5bY', '4xOP3JM23ro', 'JDcdhTuycOI',
    'D0DfoMz8-8Q', 'Fg-lwNBzVV8', '2nfsR9PC7hQ',
    'ITVGNDiBur0', 'Oic0YR6HW-o', 'GBDCcdRbvv0',
    'pNvXq37fSqo', 'NqsoTIPQ0ec', 'MZxBzSveakY',
    'OlcRCMpz6GA', 'b8O0u9qnRS4', 'M50NV4vSA8c',
    'VmbrkHf9Nps', 'A6pO5wL-Oco', '1Ja_fqUehHA',
    'DLg3E7y1ov0', 'ywgDXzYD6v8', 'etJD27_sPo4',
    'zk6BHl-7ZTI', 'T_l0AyZywjU', 'PUP3ND8KblI',
    'HVJ19uMATEM', 'USdQ4HubWZo', 'XyQ-h5XphDk',
    'siNVeuGcUSI', 'ng1DP4YVHiQ', '6Tr3GLfySYo',
    'YIJndOqIcLU', '0LamiLdn1V0', '8h8tkkVpINI',
    'vOlMjh7WkpY', '-CiWQ2IvY34'
];

export const getVideo = () => {
    const videoId = videos[Math.floor(Math.random() * videos.length)];
    return `https://www.youtube.com/embed/${videoId}`
}