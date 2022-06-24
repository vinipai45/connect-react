import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Box, Button, IconButton, Typography, Tooltip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import TopBar from '../../components/TopBar/TopBar';
import AppModal from '../../components/AppModal/AppModal';
import EditProfile from '../../components/EditProfile/EditProfile';
import StyledImageCropper from '../../components/ImageCropper/ImageCropper';
import getCroppedImg from '../../components/ImageCropper/cropImage'

import './Profile.scss'
import colors from '../../utils/_colors.scss';
import { firebase } from '../../services/firebase'
import UserDB from '../../services/UserDB/UserDB';
import { auth_user, tabBreakpoint } from '../../utils/constants'
import { validateUpdateProfileInputs } from '../../validations/updateprofile.validations';
import { firebaseExceptionHandler } from '../../services/FirebaseExceptionHandler';
import { urltoFile } from '../../utils/helper-functions/converters';

const Profile = () => {
  const { width, setActive } = useOutletContext();
  const { uid } = JSON.parse(localStorage.getItem(auth_user))

  let navigate = useNavigate()

  let storage = firebase.storage()

  let Toast = useSelector((s) => s.toast);

  const userDB = new UserDB();
  const initial = {
    avatar: '',
    name: '',
    bio: '',
    username: ''
  }
  const [user, setUser] = useState()
  const [base64Image, setBase64Image] = useState()
  const [fileType, setFileType] = useState()
  const [cropImageInProgress, setCropImageInProgress] = useState(false)
  const [updateInputs, setUpdateInputs] = useState()
  const [errors, setErrors] = useState(initial)
  const [openModal, setOpenModal] = useState(false)

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  useEffect(() => {
    setActive('profile')
  }, [])

  useEffect(() => {
    async function getUserDetail() {
      let user = await userDB.getById(uid)
      if (user) {
        setUser(user)
      } else {
        navigate('/logout')
      }
    }
    getUserDetail()
    console.log("Profile.jsx")
  }, [])

  const handleUpdate = async () => {
    try {
      if ((
        user.name === updateInputs.name &&
        user.avatar === updateInputs.avatar &&
        user.username === updateInputs.username &&
        user.bio === updateInputs.bio)
      ) {
        setOpenModal(false)
        Toast.fire({
          icon: 'success',
          title: `already up-to-date`
        })
      } else {

        let err = validateUpdateProfileInputs(updateInputs)
        if (!err.isValid) {
          setErrors(err.error)
          return
        }
        let updatedUser = await userDB.update(uid, updateInputs)
        setUser(updatedUser)
        setOpenModal(false)
        Toast.fire({
          icon: 'success',
          title: `update successful!`
        })

      }
    } catch (error) {
      console.log('Profile.jsx -> handleUpdate', error)
      let errorMessage = firebaseExceptionHandler(error.code)
      Toast.fire({
        icon: 'error',
        title: `${errorMessage}`
      })
    }


  }

  const resetImageCropProperties = () => {
    setCrop({ x: 0, y: 0 })
    setRotation(0)
    setZoom(1)
    setCroppedAreaPixels(null)
    setFileType(null)
  }

  const handleEditProfileClick = async () => {
    setUpdateInputs({
      avatar: user?.avatar,
      name: user?.name,
      username: user?.username,
      bio: user?.bio
    })
    setErrors(initial)
    setOpenModal(true)
    resetImageCropProperties()
    setBase64Image(null)
    setCroppedImage(null)
    setCropImageInProgress(false)
  }

  const handleSaveCroppedImage = async () => {
    try {
      const croppedBlobImage = await getCroppedImg(
        base64Image,
        croppedAreaPixels,
        rotation,
        fileType
      )
      setCroppedImage(croppedBlobImage)
      setCropImageInProgress(false)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (croppedImage) {
      async function store() {
        let imageFile = await urltoFile(croppedImage.toString(), uid.toString(), fileType)
        storeAvatarToFirestore(imageFile)
      }
      store()
    }
  }, [croppedImage])

  const storeAvatarToFirestore = (image) => {
    try {
      console.log(image)

      storage.ref(`/avatar/${uid}`).put(image)
        .on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          () => Toast.fire({
            icon: 'success',
            title: `upload successful`
          }),
          () => Toast.fire({
            icon: 'error',
            title: `something went wrong`
          }),
          () => storage.ref(`avatar`).child(`${uid}`).getDownloadURL().then(
            (url) => {
              setUpdateInputs({
                ...updateInputs,
                avatar: url
              });
            })
        );
    } catch (err) {
      console.log(err, "err")
      Toast.fire({
        icon: 'error',
        title: `could not save avatar`
      })
    }

  }



  return (
    <div className='_profile_container'
      style={{
        paddingRight: width < 1200 ? 0 : '20%',
      }}
    >
      <TopBar title={user?.name} />
      <Box sx={{
        width: '100%',
        height: '25%',
        backgroundColor: `${colors.primaryColor}`,
      }} />

      <Box sx={{ display: 'flex' }} >

        <img src={user?.avatar} alt=""
          style={{
            border: `1px solid ${colors.white}`,
            background: `${colors.white}`,
            borderRadius: '50%',
            marginTop: '-70px',
            marginLeft: '20px',
            width: '130px',
            height: '130px',
            objectFit: 'cover',
          }}
        />

        <Button
          sx={{
            marginLeft: 'auto',
            marginRight: width < 1200 ? '10px' : '',
            marginTop: '20px',
            marginBottom: width < tabBreakpoint ? '30px' : '20px',
            textTransform: 'capitalize',
            fontWeight: 'bold',
            borderRadius: '20px',
            color: `${colors.dark}`,
            borderColor: `${colors.mediumGrey}`,
            '&:hover': {
              borderColor: `${colors.dark}`,
            },
          }}
          onClick={handleEditProfileClick}

          variant="outlined">
          Edit Profile
        </Button>
      </Box>

      <Box sx={{ margin: '0px 20px', }}>
        <Typography sx={{
          fontWeight: 600,
          fontSize: '19px',
          textTransform: 'capitalize'
        }} >
          {user?.name}
        </Typography>

        <Typography sx={{
          fontSize: '14px',
        }} >
          {user?.username}
        </Typography>

        <Typography sx={{
          fontSize: '14px',
          margin: '20px auto'
        }} >{user?.bio}</Typography>

        <Box sx={{ display: 'flex' }}>

          <Typography sx={{
            fontSize: '16px',
            "&:hover": {
              cursor: 'pointer',
              textDecoration: 'underline'
            },
          }}> <b>60</b>  Following
          </Typography>

          <Typography sx={{
            fontSize: '16px',
            "&:hover": {
              cursor: 'pointer',
              textDecoration: 'underline'
            },
          }} ml={2}><b>73</b> Follower
          </Typography>
        </Box>



      </Box>

      {
        openModal ?
          <AppModal
            open={openModal}
            screenWidth={width}
            onClose={() => setOpenModal(false)}
          >
            <TopBar
              title={cropImageInProgress ? "Edit Avatar" : "Edit Profile"}
              onBackClick={() => setOpenModal(false)}
              startIcon={
                cropImageInProgress ?
                  <IconButton size='large' onClick={() => {
                    setBase64Image(null)
                    setCropImageInProgress(false)
                  }} >
                    <ArrowBackIcon fontSize="inherit" />
                  </IconButton>
                  :
                  <IconButton size='large' onClick={() => { setOpenModal(false) }} >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
              }
              endIcon={
                cropImageInProgress ?
                  <Button
                    onClick={handleSaveCroppedImage}
                    variant='contained'
                    sx={{
                      backgroundColor: 'black',
                      color: 'white',
                      borderRadius: '20px',
                      fontWeight: '600'
                    }}>
                    Apply
                  </Button>
                  :
                  <Tooltip title="Save">
                    <IconButton
                      size='large'
                      sx={{ color: '#388e3c' }}
                      onClick={handleUpdate}
                    >
                      <CheckCircleIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
              }
            />

            {
              cropImageInProgress ?
                <StyledImageCropper
                  screenWidth={width}
                  image={base64Image}
                  crop={crop}
                  setCrop={setCrop}
                  zoom={zoom}
                  setZoom={setZoom}
                  rotation={rotation}
                  setRotation={setRotation}
                  onCropComplete={onCropComplete}
                /> :
                <EditProfile
                  screenWidth={width}
                  user={{ ...user, uid }}
                  errors={errors}
                  croppedImage={croppedImage}
                  updateInputs={updateInputs}
                  resetImageCropProperties={resetImageCropProperties}
                  setUpdateInputs={setUpdateInputs}
                  setBase64Image={setBase64Image}
                  setFileType={setFileType}
                  setOpenModal={setOpenModal}
                  setCropImageInProgress={setCropImageInProgress}
                />
            }



          </AppModal> : <></>
      }


    </div >
  )
}

export default Profile