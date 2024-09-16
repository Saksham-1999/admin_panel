import React, { useState } from 'react';
import styles from './Tab.module.css';

const Tab = ({ label, children }) => {
    return (
        <div className={styles.tabContent}>
            {children}
        </div>
    );
};

const Tabs = ({ defaultTab = 0, children }) => {
    const [activeTab, setActiveTab] = useState(defaultTab);

    const handleTabClick = (id) => {
        setActiveTab(id);
    };

    return (
        <div className={styles.tabsContainer}>
            <div className={styles.tabsHeader}>
                {React.Children.map(children, (child, index) => (
                    <button
                        key={index}
                        className={`${styles.tabButton} ${activeTab === index ? styles.active : ''}`}
                        onClick={() => handleTabClick(index)}
                    >
                        {child.props.label}
                    </button>
                ))}
            </div>
            {React.Children.map(children, (child, index) => (
                index === activeTab && React.cloneElement(child, { key: index })
            ))}
        </div>
    );
};

export { Tabs, Tab };
