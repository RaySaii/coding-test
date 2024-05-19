import { useEffect, useRef, useState } from 'react';
import styles from './home.module.css';
import Profile from './components/Profile';
import api from '../libs/api';

function Home() {
  const [edit, setEdit] = useState(false);
  const [profile, setProfile] = useState({});
  const profileRef = useRef();
  const [loading, setLoading] = useState(false);

  const onEdit = () => {
    setEdit(!edit);
  };

  const onCancel = () => {
    setEdit(false);
    setProfile({ ...profile });
  };

  const onSave = () => {
    if (profileRef.current.validate()) {
      setLoading(true);
      api
        .post('/api/user', { ...profileRef.current.getProfile(), did: profile.did })
        .then(() => {
          setEdit(false);
          getProfile();
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  const getProfile = () => {
    api
      .get('/api/user')
      .then((res) => {
        setProfile(res.data.user);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.card}>
        <div className={styles.title}>Profile</div>
        <Profile ref={profileRef} profile={profile} edit={edit} />
        <div className={styles.option}>
          <button disabled={loading} type="button" onClick={edit ? onSave : onEdit}>
            {/* eslint-disable-next-line no-nested-ternary */}
            {loading ? <div className={styles.loading} /> : edit ? 'save' : 'edit'}
          </button>
          {edit && (
            <button disabled={loading} type="button" className={styles.cancel} onClick={onCancel}>
              cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
