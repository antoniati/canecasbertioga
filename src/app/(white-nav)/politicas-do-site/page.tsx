"use client";

import { useSearchParams } from "next/navigation";

import { PolicyPageManager } from "@/components/PolicyPageManager";

export default function PolicyPage() {
    const searchParams = useSearchParams();
    const tabIndex = parseInt(searchParams.get("tab") || "0", 10);

    return (
        <PolicyPageManager defaultTabIndex={tabIndex} />
    );
}