import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import styles from './Profile.module.css';

function Profile(props, ref) {
  const { edit, profile: profileFromProps } = props;
  const [profile, setProfile] = useState(profileFromProps);
  const [errors, setErrors] = useState({});
  const CONFIG = {
    avatar: { type: 'img', rules: { required: true } },
    fullName: { type: 'text', rules: { required: true, minLength: 2, maxLength: 15 } },
    email: {
      type: 'text',
      rules: { required: true, reg: [/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, 'Invalid email'] },
    },
    phone: {
      type: 'text',
      rules: { required: true, reg: [/^\d{11}$/, 'Invalid phone number'] },
    },
    role: {
      type: 'select',
      options: [
        { value: 'Owner', label: 'Owner' },
        { value: 'Admin', label: 'Admin' },
        {
          value: 'Member',
          label: 'Member',
        },
        {
          value: 'Guest',
          label: 'Guest',
        },
        {
          value: 'Other',
          label: 'Other',
        },
      ],
      rules: { required: true },
    },
  };

  useEffect(() => {
    setProfile(profileFromProps);
  }, [profileFromProps]);

  useEffect(() => {
    setErrors({});
  }, [edit]);

  useImperativeHandle(ref, () => ({
    validate() {
      const newErrors = {};
      Object.keys(CONFIG).forEach((key) => {
        newErrors[key] = validate(key, profile[key]);
      });
      setErrors(newErrors);
      return Object.values(newErrors).every((x) => x.length === 0);
    },
    getProfile: () => ({ ...profile }),
  }));

  const validate = (key, value) => {
    const { rules } = CONFIG[key];
    if (rules.required && !value) {
      return 'This field is required';
    }
    if (rules.minLength && value.length < rules.minLength) {
      return `Name must be at least ${rules[key].minLength} characters`;
    }
    if (rules.maxLength && value.length > rules.maxLength) {
      return `Name must be less than ${rules[key].maxLength} characters`;
    }
    if (rules.reg && !rules.reg[0].test(value)) {
      return rules.reg[1];
    }
    return '';
  };

  const onUpload = (key, file) => {
    if (file.size > 1024 * 1024) {
      // eslint-disable-next-line no-alert
      alert('File size must be less than 1MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile({ ...profile, [key]: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const onChange = (key, value) => {
    setProfile({ ...profile, [key]: value });
    setErrors({ ...errors, [key]: validate(key, value) });
  };

  const renderImgUpload = () => {
    return (
      <div>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <img
          className={styles.upload}
          style={{ cursor: 'pointer' }}
          src={profile.avatar}
          alt="avatar"
          onClick={(e) => e.target.nextSibling.click()}
        />
        <input accept=".png,.jpg,.jpeg" hidden type="file" onChange={(e) => onUpload('avatar', e.target.files[0])} />
      </div>
    );
  };

  const renderInfo = (key, value) => {
    if (edit) {
      return (
        <div>
          {CONFIG[key].type === 'img' && renderImgUpload()}
          {CONFIG[key].type === 'text' && (
            <input type="text" value={value} onChange={(e) => onChange(key, e.target.value)} />
          )}
          {CONFIG[key].type === 'select' && (
            <select value={value} onChange={(e) => onChange(key, e.target.value)}>
              <option value="">select a value</option>
              {CONFIG[key].options.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          )}
          <div className={styles.error}>{errors[key]}</div>
        </div>
      );
    }

    return (
      <div>
        {CONFIG[key].type === 'img' && <img src={value} alt="avatar" />}
        {CONFIG[key].type !== 'img' && value}
      </div>
    );
  };

  return (
    <div className={styles.profile}>
      <div className={styles.avatar}>
        <div>Avatar</div>
        {renderInfo('avatar', profile.avatar)}
      </div>
      <div className={styles.username}>
        <div>Name</div>
        {renderInfo('fullName', profile.fullName)}
      </div>
      <div className={styles.email}>
        <div>Email</div>
        {renderInfo('email', profile.email)}
      </div>
      <div className={styles.phone}>
        <div>Phone</div>
        {renderInfo('phone', profile.phone)}
      </div>
      <div className={styles.role}>
        <div>Role</div>
        {renderInfo('role', profile.role)}
      </div>
    </div>
  );
}

export default forwardRef(Profile);
