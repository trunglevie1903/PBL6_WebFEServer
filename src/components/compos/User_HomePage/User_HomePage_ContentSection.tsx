import React, {CSSProperties, useState, useEffect} from 'react';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';

import ContentSection_Card from './User_HomePage_ContentSection_ContentCard';

const User_HomePage_ContentSection: React.FC = () => {
  const [columns, setColumns] = useState(3);
  const [videoIds, setVideoIds] = useState<Array<string>>([]);

  const updateColumns = () => {
    const width = window.innerWidth;
    if (width < 600) {
      setColumns(1);
    } else if (width < 1000) {
      setColumns(2);
    } else {
      setColumns(3);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://127.0.0.1:4000/video/latest-ids");
      if (response.status === 200 && response.data.ids) {
        const ids: Array<string> = response.data.ids;
        console.log(ids.length);
        // if (ids.length > 0) {
        //   const newIds: Array<string> = [];
        //   for (let i = 0; i < 6; ++i) {
        //     newIds.push(ids[i % ids.length]);
        //   }
        //   setVideoIds(newIds);
        // }
        setVideoIds(ids);
      }
    };
    fetchData();
  }, []);

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
      display: 'flex',
      justifyContent: 'space-between',
      padding: '20px',
      flexDirection: columns === 1 ? 'column' : 'row',
      alignItems: columns === 1 ? 'center' : 'space-around',
      flexWrap: columns === 1 ? 'nowrap' : 'wrap',
    },
    column: {
      width: columns === 1 ? '90%' : columns === 2 ? '45%' : '30%',
      marginBottom: '20px',
    }
  }

  // Temporary card data
  return (
    <div style={styles.contentSection} className="ContentSection">
      <section style={styles.content}>
        {videoIds.map((id) => (
          <div key={uuidv4()} style={styles.column}>
            <ContentSection_Card videoId={id}/>
          </div>
        ))}
      </section>
    </div>
  );
};

export default User_HomePage_ContentSection;