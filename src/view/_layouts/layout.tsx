import { ReactNode, useState } from "react";
import { Aside } from "../components/aside";
import { Header } from "../components/header";
import { Modal } from "../components/modal";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleModalOpen = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[300px_1fr] bg-neutral-950 text-gray-400 antialiased ">
      <Aside/>

      <div>
      <Header onOpeningModal={handleModalOpen}  />
      <main className="p-8 ">
      {children}
      </main>
      </div>
      {
        isModalOpen && <Modal onModalClose={handleModalClose} />
      }
    </div>
  );
}
