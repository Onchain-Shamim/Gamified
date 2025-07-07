'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile as updateProfileAction } from '../../features/auth/authSlice';
import { useUpdateProfileMutation } from '../../features/services/usersApi';


type FormInputs = {
  name: string;
  bio: string;
  role: string;
  contactInfo: string;
  points: number;
  phone: string;
  phoneVerified: boolean;
  photoUrl: string;
  profilePrivacy: string;
  rankLevel: number;
  isBanned: boolean;
  photo: FileList;
};

const ProfileForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);
  console.log('User in ProfileForm:', user);
  const { register, handleSubmit, reset } = useForm<FormInputs>({
    defaultValues: user || {},
  });
  const [updateProfile, { isLoading, isSuccess, error }] = useUpdateProfileMutation();

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('bio', data.bio);
    formData.append('role', data.role);
    formData.append('contactInfo', data.contactInfo);
    formData.append('points', String(data.points));
    formData.append('phone', data.phone);
    formData.append('phoneVerified', String(data.phoneVerified));
    formData.append('photoUrl', data.photoUrl);
    formData.append('profilePrivacy', data.profilePrivacy);
    formData.append('rankLevel', String(data.rankLevel));
    formData.append('isBanned', String(data.isBanned));
    if (data.photo && data.photo[0]) {
      formData.append('photo', data.photo[0]);
    }

    try {
      const res = await updateProfile(formData).unwrap();
      // Update Redux store with new user info (except photo field)
      const { photo, ...userData } = data;
      dispatch(updateProfileAction(userData));
      alert('Profile updated!');
      reset();
    } catch (err) {
      console.log('Upload error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">

      <input type="text" {...register('name')} placeholder="Name" className="border p-2 w-full" />
      <textarea {...register('bio')} placeholder="Bio" className="border p-2 w-full" />
      <input type="text" {...register('role')} placeholder="Role" className="border p-2 w-full" />
      <input type="text" {...register('contactInfo')} placeholder="Contact Info" className="border p-2 w-full" />
      <input type="number" {...register('points')} placeholder="Points" className="border p-2 w-full" />
      <input type="text" {...register('phone')} placeholder="Phone" className="border p-2 w-full" />
      <input type="checkbox" {...register('phoneVerified')} /> Phone Verified
      <input type="text" {...register('photoUrl')} placeholder="Photo URL" className="border p-2 w-full" />
      <input type="text" {...register('profilePrivacy')} placeholder="Profile Privacy" className="border p-2 w-full" />
      <input type="number" {...register('rankLevel')} placeholder="Rank Level" className="border p-2 w-full" />
      <input type="checkbox" {...register('isBanned')} /> Is Banned
      <input type="file" accept="image/*" {...register('photo')} className="border p-2 w-full" />

      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {isLoading ? 'Uploading...' : 'Update Profile'}
      </button>

      {isSuccess && <p className="text-green-500">Profile updated successfully!</p>}
      {error && <p className="text-red-500">Upload failed. Please try again.</p>}
    </form>
  );
};

export default ProfileForm;
