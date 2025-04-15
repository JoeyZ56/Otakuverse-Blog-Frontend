"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import Image from "next/image";
// // import UserPosts from "../../userposts/page";
import Modal from "../../../components/Modal";

// import EditUserInfoModal from "../../../components/EditUserInfoModal";

const UserAccount = () => {
  const [auth, setAuth] = useState({ token: null, userId: null });
  const [userData, setUserData] = useState({});
  const [bio, setBio] = useState("");
  const [newBio, setNewBio] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();

  //fetch calls
  const fetchUserData = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:4000/api/users/account/${auth.userId}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

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

      const res = await fetch("http://localhost:4000/api/users/account/bio", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      const data = await res.json();
      setBio(data);
    } catch (err) {
      console.error("Failed to fetch user bio from the backend", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const saveBio = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:4000/api/users/account/bio/save`,
        {
          method: "PUT", //updates bio
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({ bio: newBio }),
        }
      );

      //const data = await res.json();

      if (res.ok) {
        setBio(newBio);
        closeModal();
      } else {
        throw new Error("Failed to save bio");
      }
    } catch (err) {
      console.error("Error saving bio:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      router.push("/login");
      return;
    }

    setAuth({ token, userId });
  }, []);

  useEffect(() => {
    if (auth.token && auth.userId) {
      fetchUserData();
      fetchBio();
    }
  }, [auth]);

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
    <div className="min-h-screen px-4 py-10 bg-gray-100">
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <ClipLoader size={80} color="#7e22ce" />
        </div>
      ) : (
        <div className="max-w-3xl p-6 mx-auto space-y-6 bg-white shadow-md rounded-xl">
          {/* Profile Header */}
          <div className="flex items-center space-x-4">
            {userData.profileImage && (
              <Image
                src={`data:image/png;base64,${Buffer.from(
                  userData.profileImage.data.data
                ).toString("base64")}`}
                alt="User"
                width={80}
                height={80}
                className="object-cover border-2 border-black rounded-full"
              />
            )}
            <div>
              <h2 className="text-2xl font-bold text-purple-700">
                {userData.name}
              </h2>
              <p className="text-sm text-gray-500">{userData.email}</p>
            </div>
          </div>

          {/* Bio Section */}
          <div>
            <h3 className="mb-2 text-lg font-semibold text-gray-700">Bio</h3>
            <p className="text-gray-600 whitespace-pre-wrap">
              {bio || "No bio yet."}
            </p>
            <button
              onClick={handleBioModal}
              className="px-4 py-2 mt-4 text-white transition bg-purple-600 rounded-md hover:bg-purple-700"
            >
              Edit Bio
            </button>
          </div>

          {/* Modal */}
          <Modal isOpen={isOpen} onClose={closeModal}>
            <h2 className="mb-4 text-xl font-semibold">Edit Bio</h2>
            <textarea
              value={newBio}
              onChange={handleBioChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={5}
              placeholder="Write something about yourself..."
            />
            <div className="flex justify-end mt-4 space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={saveBio}
                className="px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700"
              >
                Save
              </button>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default UserAccount;
