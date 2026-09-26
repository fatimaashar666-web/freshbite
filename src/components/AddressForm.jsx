import React, { useState } from 'react';
import { User, Phone, MapPin, Building, Hash, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import './AddressForm.css';

const AddressForm = ({ initialAddress, onSaveAddress, isSaved, setIsSaved }) => {
  const [formData, setFormData] = useState({
    fullName: initialAddress.fullName || '',
    phone: initialAddress.phone || '',
    streetAddress: initialAddress.streetAddress || '',
    apartment: initialAddress.apartment || '',
    city: initialAddress.city || '',
    postalCode: initialAddress.postalCode || '',
    instructions: initialAddress.instructions || ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^[0-9+() -]{7,16}$/.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (!formData.streetAddress.trim()) errs.streetAddress = 'Street address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.postalCode.trim()) errs.postalCode = 'Postal code is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (isSaved) {
      setIsSaved(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSaveAddress(formData);
      if (setIsSaved) setIsSaved(true);
    }
  };

  return (
    <div className="address-form-container card">
      <div className="address-form-header">
        <div className="icon-badge">
          <MapPin size={22} />
        </div>
        <div>
          <h3 className="address-form-title">Delivery Address</h3>
          <p className="address-form-subtitle">Enter where you'd like your order delivered</p>
        </div>
        {isSaved && (
          <span className="saved-badge">
            <CheckCircle size={15} /> Saved
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="address-form" noValidate>
        {/* Full Name & Phone Number */}
        <div className="form-row two-cols">
          <div className="form-group">
            <label className="form-label">
              Full Name <span className="required">*</span>
            </label>
            <div className="input-with-icon">
              <User size={18} className="field-icon" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. John Doe"
                className={`form-input ${errors.fullName ? 'error' : ''}`}
              />
            </div>
            {errors.fullName && <p className="error-text"><AlertCircle size={13} /> {errors.fullName}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Phone Number <span className="required">*</span>
            </label>
            <div className="input-with-icon">
              <Phone size={18} className="field-icon" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. +1 555-0199 or 0300-1234567"
                className={`form-input ${errors.phone ? 'error' : ''}`}
              />
            </div>
            {errors.phone && <p className="error-text"><AlertCircle size={13} /> {errors.phone}</p>}
          </div>
        </div>

        {/* Street Address */}
        <div className="form-group">
          <label className="form-label">
            Street Address <span className="required">*</span>
          </label>
          <div className="input-with-icon">
            <MapPin size={18} className="field-icon" />
            <input
              type="text"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleChange}
              placeholder="e.g. 742 Evergreen Terrace, Sector 4"
              className={`form-input ${errors.streetAddress ? 'error' : ''}`}
            />
          </div>
          {errors.streetAddress && <p className="error-text"><AlertCircle size={13} /> {errors.streetAddress}</p>}
        </div>

        {/* Apartment & City & Postal Code */}
        <div className="form-row three-cols">
          <div className="form-group">
            <label className="form-label">Apartment / House #</label>
            <div className="input-with-icon">
              <Building size={18} className="field-icon" />
              <input
                type="text"
                name="apartment"
                value={formData.apartment}
                onChange={handleChange}
                placeholder="Apt 4B / Villa 12"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              City <span className="required">*</span>
            </label>
            <div className="input-with-icon">
              <Building size={18} className="field-icon" />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g. New York / Lahore"
                className={`form-input ${errors.city ? 'error' : ''}`}
              />
            </div>
            {errors.city && <p className="error-text"><AlertCircle size={13} /> {errors.city}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Postal Code <span className="required">*</span>
            </label>
            <div className="input-with-icon">
              <Hash size={18} className="field-icon" />
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="e.g. 10001 or 54000"
                className={`form-input ${errors.postalCode ? 'error' : ''}`}
              />
            </div>
            {errors.postalCode && <p className="error-text"><AlertCircle size={13} /> {errors.postalCode}</p>}
          </div>
        </div>

        {/* Delivery Instructions */}
        <div className="form-group">
          <label className="form-label">Delivery Instructions (Optional)</label>
          <div className="input-with-icon textarea-icon-wrapper">
            <MessageSquare size={18} className="field-icon-textarea" />
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              placeholder="e.g. Please ring the doorbell and leave at doorstep, call upon arrival..."
              rows={3}
              className="form-textarea"
            />
          </div>
        </div>

        <div className="address-form-actions">
          <button type="submit" className="btn btn-primary">
            {isSaved ? 'Update Address' : 'Confirm & Save Address'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
