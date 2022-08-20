import { useState } from 'react'
import CloudIcon from '../../icons/CloudIcon'
import ToggleArrow from '../../icons/ToggleArrow'
import styles from './styles.module.css'

export default function CloudFiles () {
  const [isOpenCloudFiles, setIsOpenCloudFiles] = useState<boolean>(false)

  return (
    <div className={styles.localFilesContainer}>
      <div className={styles.localFiles} onClick={() => {
        setIsOpenCloudFiles(prev => !prev)
      }} onContextMenu={(e) => {}}>
        <p className={styles.title}>
          <ToggleArrow isOpen={isOpenCloudFiles}/>
          <CloudIcon fill={'currentColor'} stroke={'none'}/>
          <span>Cloud files</span>
        </p>
      </div>
    </div>
  )
}
