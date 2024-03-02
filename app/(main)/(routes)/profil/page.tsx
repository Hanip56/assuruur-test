import { db } from "@/lib/db";
import Banner from "../../_components/banner";
import ProfilClient from "./_components/profil-client";
import { BASE_IMAGE_URL } from "@/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profil",
};

const ProfilePage = async () => {
  const profil = await db.lembaga.findUnique({
    where: {
      id: "65d94f564a122b6a6b0b8337",
    },
    include: {
      misi: true,
    },
  });

  return (
    <div>
      <Banner
        title="Profil Sekolah"
        image={`${BASE_IMAGE_URL}/${profil?.image}`}
      />
      <ProfilClient profil={profil} />
    </div>
  );
};

export default ProfilePage;
