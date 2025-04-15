"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
// // import UserPosts from "../../userposts/page";
import Modal from "../../../components/Modal";
// import EditUserInfoModal from "../../../components/EditUserInfoModal";

const ViewAccount = () => {
  const [userData, setUserData] = useState([]);
  const [bio, setBio] = useState("");
  const [newBio, setNewBio] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const params = useParams();
  const userId = params?.id;

  //fetch calls
  const fetchUserData = async () => {
    try {
      setLoading(true);

      const res = await fetch(`http://localhost:4000/account/${userId}`);

      const data = await res.json();
      setUserData(data);
    } catch (error) {
      console.error("Failed to fetch user data from the backend", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchBio = async () => {
    try {
      setLoading(true);

      const res = await fetch(`http://localhost:4000/account/${userId}/bio`);

      const data = await res.json();
      setBio(data);
    } catch (error) {
      console.error("Failed to fetch user bio from the backend", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const saveBio = async () => {
    try {
      const res = await fetch(`http://localhost:4000/account/${userId}/bio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bio: newBio }),
      });

      if (res.ok) {
        setBio(newBio);
        closeModal();
      } else {
        throw new Error("Failed to save bio");
      }
    } catch (err) {
      console.error("Error saving bio:", err);
      setError(true);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserData();
      fetchBio();
    }
  }, [userId]);

  const handleBioModal = () => {
    setIsOpen(!isOpen);
    setNewBio(bio);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleBioChange = (e) => {
    setNewBio(e.target.value);
  };

  return (
    <div className="">
      <div className="flex items-center space-x-4">
        {userData.profileImage && (
          <Image
            src={`data:image/png;base64,${Buffer.from(
              userData.profileImage.data.data
            ).toString("base64")}`}
            alt="User"
            width={60}
            height={60}
            className="object-cover border rounded-full"
          />
        )}
        <span className="text-lg font-medium text-gray-700">
          {userData.username}
        </span>
      </div>

      <p>{bio}</p>
      <button onClick={handleBioModal} className="">
        Edit Bio
      </button>
      <div className="">
        <Modal isOpen={isOpen} onClose={closeModal} className="">
          <h2>Edit Bio</h2>

          <textarea value={newBio} input="text" onChange={handleBioChange} />
          <div className="">
            <button onClick={saveBio} className="">
              Save
            </button>
            <button onClick={closeModal} className="">
              Close
            </button>
          </div>
        </Modal>
        {/* </div>
      <EditUserInfoModal />
      <div>
        <UserPosts /> */}
      </div>
    </div>
  );
};

export default ViewAccount;
