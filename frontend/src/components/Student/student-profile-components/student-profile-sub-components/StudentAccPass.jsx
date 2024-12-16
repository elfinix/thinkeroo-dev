import React, { useState } from 'react';
import { Eye, EyeClosed } from 'lucide-react';
import TrashIcon from '../../student-basic-components/student-icons-components/TrashIcon';
import StudentModal from '../../student-basic-components/student-modal-components/StudentModal';

function StudentAccPass({ student }) {

  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState ('');
  const [modalDescription, setModalDescription] = useState('');
  const [modalBttn, setModalBttn] = useState('');

  const togglePasswordVisibility = (field) => {
    if (field === 'current') {
      setIsCurrentPasswordVisible(prevState => !prevState);
    } else if (field === 'new') {
      setIsNewPasswordVisible(prevState => !prevState);
    } else if (field === 'confirm') {
      setIsConfirmPasswordVisible(prevState => !prevState);
    }
  };

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    const requiredFields = ['currentPassword', 'newPassword', 'confirmPassword'];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      newErrors.general = 'Some required fields are empty';
    }
    else if (formData.newPassword && formData.confirmPassword && formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'New password and confirm password do not match';
    }
    else if (formData.currentPassword !== student.institutionDetail.password) {
      newErrors.currentPassword = 'The current password is incorrect';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setModalTitle('Change Password?');
      setModalDescription('Are you sure you want to change your password?');
      setModalBttn('Change');
      setIsModalOpen(true);
    }
  };
  
  const handleDeleteAccount = () => {
    setModalTitle('Delete Account?');
    setModalDescription('Deleting your account will remove all your data permanently. Are you sure you want to proceed?');
    setModalBttn('Delete');
    setIsModalOpen(true);
  };

  const handleConfirmSave = () => {
    // Logic for saving changes goes here
    // setIsModalOpen(false);
    console.log('Form data saved:', formData);
  };

  const handleCancelSave = () => {
    setIsModalOpen(false); 
  };

  return (
    <div className="rounded-lg max-w-3xl mx-auto font-lexend">
      <h2 className="text-lg font-semibold text-text-1 mb-6">Change Password</h2>
      <div className="space-y-4">
        {/* Current Password */}
        <div>
          <label className="block text-text-2 mb-2 text-sm">Current Password</label>
          <div className="relative">
            <input
              type={isCurrentPasswordVisible ? "text" : "password"}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleInputChange}
              className={`w-full p-2 rounded-lg text-text-1 text-sm bg-primary-1 border border-primary-3 focus:outline-none focus:ring-2 
                ${errors.currentPassword || errors.general ? 'focus:ring-red-500 focus:ring-0 border-red-500' : 'focus:ring-secondary-1'}`}
              placeholder="Enter your current password"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('current')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {isCurrentPasswordVisible ? (
                <EyeClosed className="text-primary-3" />
              ) : (
                <Eye className="text-primary-3" />
              )}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="block text-text-2 mb-2 text-sm">New Password</label>
          <div className="relative">
            <input
              type={isNewPasswordVisible ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              className={`w-full p-2 rounded-lg text-text-1 text-sm bg-primary-1 border border-primary-3 focus:outline-none focus:ring-2 
                ${errors.newPassword || errors.general ? 'focus:ring-red-500 focus:ring-0 border-red-500' : 'focus:ring-secondary-1'}`}
              placeholder="Enter your new password"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('new')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {isNewPasswordVisible ? (
                <EyeClosed className="text-primary-3" />
              ) : (
                <Eye className="text-primary-3" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-text-2 mb-2 text-sm">Confirm Password</label>
          <div className="relative">
            <input
              type={isConfirmPasswordVisible ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`w-full p-2 rounded-lg text-text-1 text-sm bg-primary-1 border border-primary-3 focus:outline-none focus:ring-2 
                ${errors.confirmPassword || errors.general ? 'focus:ring-red-500 focus:ring-0 border-red-500' : 'focus:ring-secondary-1'}`}
              placeholder="Confirm your new password"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('confirm')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {isConfirmPasswordVisible ? (
                <EyeClosed className="text-primary-3" />
              ) : (
                <Eye className="text-primary-3" />
              )}
            </button>
          </div>
          {errors.general && (
           <div className="text-red-500 mt-4 font-light text-sm">{errors.general}</div>
          )}
          {errors.confirmPassword && (
            <div className="text-red-500 mt-4 font-light text-sm">{errors.confirmPassword}</div>
          )}
          {errors.currentPassword && (
            <div className="text-red-500 mt-4 font-light text-sm">{errors.currentPassword}</div>
          )}
        </div>

        <div className="flex justify-start">
          <button
            onClick={handleChangePassword}
            className="mt-2 bg-accent-1 text-primary-1 text-sm font-semibold rounded-full px-4 py-2 w-[163px] hover:bg-accent-2 ml-auto"
          >
            Change Password
          </button>
        </div>
      </div>

      {/*Account Deletion*/}
      <div className="mt-10 -mb-8">
        <h2 className="text-sm text-red-500 mb-4 flex items-center justify-center">
          <span className="flex-grow border-t border-red-500 mr-5"></span> 
          Danger Zone
          <span className="flex-grow border-t border-red-500 ml-5"></span>
        </h2>
        <p className="text-text-1 mb-4 text-base">Account Deletion</p>
        <p className="text-text-2 mb-4 text-xs">
          Deleting your account will remove all your classes, quizzes, and data banks. Please proceed with caution.
        </p>
        <button
          className="px-4 py-2 mb-8 flex items-center justify-center rounded-lg border-2 border-[#F93F3F] text-[#F93F3F] hover:opacity-75 text-sm font-medium w-[115px]"
          onClick={handleDeleteAccount} 
        >
          <TrashIcon size={20} />
          Delete
        </button>
      </div>

      <StudentModal 
        isOpen={isModalOpen}
        onClose={handleCancelSave}
        onSave={handleConfirmSave}
        modalTitle={modalTitle}
        modalDesc={modalDescription}
        bttnName={modalBttn}
      />

    </div>
  );
}

export default StudentAccPass;