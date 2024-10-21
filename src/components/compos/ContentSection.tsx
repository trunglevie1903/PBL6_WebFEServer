import { CSSProperties, useEffect, useState } from 'react';
import ContentSection_Card from './ContentSection_Card';

const ContentSection = () => {
  const [columns, setColumns] = useState(3);

  const updateColumns = () => {
    const width = window.innerWidth;
    // console.log('window width: ', w);
    if (width < 500) {
      setColumns(1);
    } else if (width < 720) {
      setColumns(2);
    } else {
      setColumns(3);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', updateColumns);
    updateColumns();
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const styles: {[key: string]: CSSProperties} = {
    contentSection: {
      maxWidth: "max(300px, 90%)",
      margin: "0 auto",
    },
    content: {
      // width: "80%",
      display: 'flex',
      justifyContent: 'space-between',
      padding: '20px',
      flexDirection: columns === 1 ? 'column' : 'row',
      alignItems: columns === 1 ? 'center' : 'space-around',
      flexWrap: columns === 1 ? 'nowrap' : 'wrap',
    },
    column: {
      width: columns === 1 ? '80%' : columns === 2 ? '45%' : '30%',
      marginBottom: '20px',
    }
  }

  // Temporary card data
  const cardData = [
    { id: 1, title: 'Card 1', imageUrl: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Card 2', imageUrl: 'https://via.placeholder.com/150' },
    { id: 3, title: 'Card 3', imageUrl: 'https://via.placeholder.com/150' },
    { id: 4, title: 'Card 4', imageUrl: 'https://via.placeholder.com/150' },
    { id: 5, title: 'Card 5', imageUrl: 'https://via.placeholder.com/150' },
    { id: 6, title: 'Card 6', imageUrl: 'https://via.placeholder.com/150' }
  ];

  return (
    <div style={styles.contentSection} className="ContentSection">
      <section style={styles.content}>
        {cardData.map((card) => (
          <div key={card.id} style={styles.column}>
            <ContentSection_Card title={card.title} imageUrl={card.imageUrl} />
          </div>
        ))}
      </section>
    </div>
  );
};

export default ContentSection;
